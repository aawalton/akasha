import { existsSync, mkdirSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const CATALOG_URL = "https://www.elderscrollsonline.com/en-us/media/category/wallpapers"
const DETAIL_URL_BASE = "https://www.elderscrollsonline.com/en-us/media/post/"
const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
const DEFAULT_AGE_COOKIE = "age_gate=487663200%261780854425; APE-Age-Gate=1"
const AGE_COOKIE =
  z.string().min(1).optional().parse(process.env.ESO_AGE_GATE_COOKIE) ?? DEFAULT_AGE_COOKIE
const OUTPUT_ROOT = join(homedir(), "Pictures", "ESO Wallpaper")
const CONCURRENCY = 6

const POST_RE = /\/en-us\/media\/post\/(\d+)\?.*?'>([^<]+)<\/a><\/h3>/s
const POST_FIELDS_SCHEMA = z.tuple([z.string(), z.string()])

export type CatalogEntry = { title: string; postId: string }
export type Resolution = { label: string; url: string }

const decodeEntities = (s: string): string =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&#39;", "'")
    .replaceAll("&#039;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&rsquo;", "’")
    .replaceAll("&mdash;", "—")
    .replaceAll("&ndash;", "–")

export const parseCatalog = (html: string): readonly CatalogEntry[] => {
  const anchor = /<a\b[^>]*href="https:\/\/esoss[^"]+\.jpe?g"[^>]*data-zl-title="(.*?)"[\s>]/gs
  const seen = new Set<string>()
  const entries: CatalogEntry[] = []
  for (const match of html.matchAll(anchor)) {
    const zlTitle = decodeEntities(match[1] ?? "")
    let postId: string
    let title: string
    try {
      const [id, rawTitle] = requireMatchPositional(POST_RE, POST_FIELDS_SCHEMA, zlTitle)
      postId = id
      title = rawTitle.trim()
    } catch {
      continue
    }
    if (title.length === 0 || seen.has(postId)) continue
    seen.add(postId)
    entries.push({ title, postId })
  }
  return entries
}

export const parseResolutions = (html: string): readonly Resolution[] => {
  const link = /href="(https:\/\/esoss[^"]+\.jpe?g)\?no-resize"[^>]*>(\d+x\d+)</g
  const byLabel = new Map<string, string>()
  for (const match of html.matchAll(link)) {
    const url = match[1]
    const label = match[2]
    if (url !== undefined && label !== undefined && !byLabel.has(label)) byLabel.set(label, url)
  }
  return [...byLabel].map(([label, url]) => ({ label, url }))
}

export const sanitizeFolderName = (title: string): string => {
  const cleaned = [...title]
    .map((ch) => {
      if (ch === "/" || ch === "\\") return "-"
      return (ch.codePointAt(0) ?? 0) < 0x20 ? " " : ch
    })
    .join("")
  return cleaned.replace(/\s+/g, " ").trim()
}

const withRetry = async <T>(fn: () => Promise<T>, attempts = 3): Promise<T> => {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      await new Promise((r) => setTimeout(r, 500 * (i + 1)))
    }
  }
  throw lastError
}

const fetchWithCookie = (url: string): Promise<Response> =>
  withRetry(() =>
    fetch(url, {
      headers: { "User-Agent": USER_AGENT, Cookie: AGE_COOKIE },
    })
  )

const fetchText = async (url: string): Promise<string> => {
  const res = await fetchWithCookie(url)
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

const downloadTo = async (url: string, dest: string): Promise<number> => {
  const res = await fetchWithCookie(url)
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  const bytes = await res.arrayBuffer()
  await Bun.write(dest, bytes)
  return bytes.byteLength
}

const pool = async <T>(
  items: readonly T[],
  limit: number,
  worker: (item: T) => Promise<void>
): Promise<void> => {
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
    (async () => {
      while (cursor < items.length) {
        const index = cursor++
        const item = items[index]
        if (item !== undefined) await worker(item)
      }
    })()
  )
  await Promise.all(runners)
}

const main = async (): Promise<void> => {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const limitArg = args.indexOf("--limit")
  const limit = limitArg >= 0 ? Number.parseInt(args[limitArg + 1] ?? "", 10) : undefined

  console.log(`Fetching catalog: ${CATALOG_URL}`)
  const catalog = parseCatalog(await fetchText(CATALOG_URL))
  const entries = limit !== undefined && Number.isFinite(limit) ? catalog.slice(0, limit) : catalog
  console.log(
    `Found ${catalog.length} wallpapers${
      entries.length !== catalog.length ? ` (limited to ${entries.length})` : ""
    }.`
  )

  const usedFolders = new Set<string>()
  let downloaded = 0
  let skipped = 0
  let failed = 0

  for (const entry of entries) {
    let folderName = sanitizeFolderName(entry.title)
    if (usedFolders.has(folderName)) folderName = `${folderName} (${entry.postId})`
    usedFolders.add(folderName)
    const folder = join(OUTPUT_ROOT, folderName)

    let resolutions: readonly Resolution[]
    try {
      resolutions = parseResolutions(await fetchText(`${DETAIL_URL_BASE}${entry.postId}`))
    } catch (error) {
      console.warn(`  ! ${entry.title}: detail fetch failed (${String(error)})`)
      failed++
      continue
    }
    if (resolutions.length === 0) {
      console.warn(`  ! ${entry.title}: no resolutions found`)
      failed++
      continue
    }

    if (!dryRun) mkdirSync(folder, { recursive: true })
    console.log(`• ${folderName} — ${resolutions.length} sizes`)

    await pool(resolutions, CONCURRENCY, async (resolution) => {
      const dest = join(folder, `${resolution.label}.jpg`)
      if (existsSync(dest) && statSync(dest).size > 0) {
        skipped++
        return
      }
      if (dryRun) {
        console.log(`    would download ${resolution.label} <- ${resolution.url}`)
        return
      }
      try {
        const size = await downloadTo(resolution.url, dest)
        downloaded++
        console.log(`    ${resolution.label} (${(size / 1024).toFixed(0)} KB)`)
      } catch (error) {
        failed++
        console.warn(`    ! ${resolution.label}: ${String(error)}`)
      }
    })
  }

  console.log(`\nDone. ${downloaded} downloaded, ${skipped} skipped (existing), ${failed} failed.`)
  console.log(`Output: ${OUTPUT_ROOT}`)
}

if (import.meta.main) await main()
