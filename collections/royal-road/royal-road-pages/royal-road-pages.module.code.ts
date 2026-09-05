import { chapterWords as countChapterWords } from "@akasha/story-engine-core/chapter-words"

export const ROYAL_ROAD_ORIGIN = "https://www.royalroad.com"

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

export function royalRoadUrl(path: string): string {
  return path.startsWith("http") ? path : `${ROYAL_ROAD_ORIGIN}${path}`
}

export interface RawChapter {
  readonly id: string
  readonly title: string
  readonly url: string
  readonly order: number
  readonly date: string
  readonly isUnlocked: boolean
  readonly visible: boolean
}

export interface FictionMeta {
  readonly title: string | null
  readonly author: string | null
  readonly status: string | null
  readonly description: string | null
  readonly tags: readonly string[]
}

export interface ParsedFiction {
  readonly meta: FictionMeta
  readonly chapters: readonly RawChapter[]
}

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&#39;": "'",
  "&apos;": "'",
  "&quot;": '"',
}

export function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&#39;|&apos;|&quot;/g, (m) => ENTITIES[m] ?? m)
}

export function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const CHAPTERS_WITH_VOLUMES = /window\.chapters\s*=\s*(\[[\s\S]*?\]);\s*window\.volumes/
const CHAPTERS_PLAIN = /window\.chapters\s*=\s*(\[[\s\S]*?\]);/

interface ChapterJson {
  readonly id: number
  readonly title: string
  readonly url: string
  readonly order: number
  readonly date: string
  readonly isUnlocked?: boolean
  readonly visible?: number | boolean
}

export function parseChapterList(html: string): readonly RawChapter[] {
  const raw = CHAPTERS_WITH_VOLUMES.exec(html)?.[1] ?? CHAPTERS_PLAIN.exec(html)?.[1]
  if (raw === undefined) return []
  let list: readonly ChapterJson[]
  try {
    list = JSON.parse(raw) as readonly ChapterJson[]
  } catch {
    return []
  }
  return list.map((one) => ({
    id: String(one.id),
    title: decodeEntities(one.title ?? "").trim(),
    url: one.url,
    order: one.order,
    date: one.date,
    isUnlocked: one.isUnlocked !== false,
    visible: one.visible === undefined ? true : one.visible === 1 || one.visible === true,
  }))
}

const KNOWN_STATUS = ["ONGOING", "COMPLETED", "HIATUS", "STUBBED", "DROPPED"]

function textOfAll(html: string, pattern: RegExp): string[] {
  const out: string[] = []
  for (const m of html.matchAll(pattern)) {
    const inner = m[1]
    if (inner === undefined) continue
    const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim()
    if (text.length > 0) out.push(text)
  }
  return out
}

export function parseStatus(html: string): string | null {
  const labels = textOfAll(html, /<span[^>]*class="[^"]*\blabel\b[^"]*"[^>]*>([\s\S]*?)<\/span>/gi)
  for (const label of labels) {
    const upper = label.toUpperCase()
    if (KNOWN_STATUS.includes(upper)) return upper
  }
  return null
}

export function parseTags(html: string): readonly string[] {
  const tags = textOfAll(html, /<a[^>]*class="[^"]*\bfiction-tag\b[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)
  return [...new Set(tags)]
}

interface BookLd {
  readonly "@type"?: string | readonly string[]
  readonly name?: string
  readonly description?: string
  readonly author?: { readonly name?: string } | readonly { readonly name?: string }[]
}

function parseBookLd(html: string): BookLd | null {
  for (const m of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    const body = m[1]
    if (body === undefined) continue
    let parsed: unknown
    try {
      parsed = JSON.parse(body)
    } catch {
      continue
    }
    for (const candidate of Array.isArray(parsed) ? parsed : [parsed]) {
      const one = candidate as BookLd
      const type = one["@type"]
      const isBook = Array.isArray(type) ? type.includes("Book") : type === "Book"
      if (isBook) return one
    }
  }
  return null
}

type Named = { readonly name?: string }

function firstAuthorName(field: BookLd["author"]): string | null {
  if (field === undefined) return null
  if (Array.isArray(field)) return (field as readonly Named[])[0]?.name ?? null
  return (field as Named).name ?? null
}

export function parseFictionPage(html: string): ParsedFiction {
  const ld = parseBookLd(html)
  const author = firstAuthorName(ld?.author)
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1]
  const fallbackTitle = h1 === undefined ? null : decodeEntities(h1.replace(/<[^>]*>/g, "")).trim()
  return {
    meta: {
      title: ld?.name ?? fallbackTitle,
      author: author ?? null,
      status: parseStatus(html),
      description: ld?.description === undefined ? null : htmlToText(ld.description),
      tags: parseTags(html),
    },
    chapters: parseChapterList(html),
  }
}

function innerHtmlOfDiv(html: string, openPattern: RegExp): string | null {
  const opened = openPattern.exec(html)
  if (opened?.index === undefined) return null
  const from = opened.index + opened[0].length
  const tags = /<(\/?)div\b[^>]*>/gi
  tags.lastIndex = from
  let depth = 1
  for (let m = tags.exec(html); m !== null; m = tags.exec(html)) {
    depth += m[1] === "/" ? -1 : 1
    if (depth === 0) return html.slice(from, m.index)
  }
  return html.slice(from)
}

export type ProseRead =
  | { readonly ok: true; readonly text: string; readonly wordCount: number }
  | { readonly ok: false; readonly why: string }

const NO_CONTAINER = "no `chapter-content` div is in the page"

const NO_TEXT =
  "the `chapter-content` div holds no text: no `<p>` in it carries any, and nothing survives " +
  "reading its layout as line breaks either"

export function parseChapterProse(html: string): ProseRead {
  const container = innerHtmlOfDiv(html, /<div[^>]*class="[^"]*\bchapter-content\b[^"]*"[^>]*>/i)
  if (container === null) return { ok: false, why: NO_CONTAINER }
  const paragraphs: string[] = []
  for (const m of container.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const inner = m[1]
    if (inner === undefined) continue
    const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim()
    if (text.length > 0) paragraphs.push(text)
  }
  const text = paragraphs.length > 0 ? paragraphs.join("\n\n") : htmlToText(container)
  if (text.length === 0) return { ok: false, why: NO_TEXT }
  return { ok: true, text, wordCount: countChapterWords(text) }
}

export async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(45_000),
  })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
  return await response.text()
}
