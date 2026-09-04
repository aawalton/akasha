import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const SOURCE_ROOT = join(homedir(), "Pictures", "ESO Wallpaper")
const OUTPUT_ROOT = join(homedir(), "Pictures", "Wallpapers", "ESO")
const TARGET_WIDTH = 3440
const TARGET_HEIGHT = 1440
const GEOMETRY = `${TARGET_WIDTH}x${TARGET_HEIGHT}`
const TARGET_ASPECT = TARGET_WIDTH / TARGET_HEIGHT

export type SourceImage = { path: string; width: number; height: number }

export const pickBestSource = (images: readonly SourceImage[]): SourceImage | undefined => {
  const aspectBucket = (img: SourceImage): number =>
    Math.round(Math.abs(img.width / img.height - TARGET_ASPECT) * 10)
  return [...images].sort((a, b) => {
    const bucketDelta = aspectBucket(a) - aspectBucket(b)
    return bucketDelta !== 0 ? bucketDelta : b.width - a.width
  })[0]
}

const IDENTIFY_LINE = /^(\d+) (\d+) (.+)$/
const IDENTIFY_SCHEMA = z.tuple([z.coerce.number(), z.coerce.number(), z.string()])

const spawnText = async (cmd: readonly string[]): Promise<string> => {
  const proc = Bun.spawn([...cmd], { stdout: "pipe", stderr: "pipe" })
  const out = await new Response(proc.stdout).text()
  const code = await proc.exited
  if (code !== 0) {
    const err = await new Response(proc.stderr).text()
    throw new Error(`${cmd[0]} exited ${code}: ${err.trim()}`)
  }
  return out
}

const identifyFolder = async (files: readonly string[]): Promise<readonly SourceImage[]> => {
  if (files.length === 0) return []
  const out = await spawnText(["identify", "-format", "%w %h %i\n", ...files])
  const images: SourceImage[] = []
  for (const line of out.split("\n")) {
    if (line.trim().length === 0) continue
    const [width, height, path] = requireMatchPositional(IDENTIFY_LINE, IDENTIFY_SCHEMA, line)
    images.push({ path, width, height })
  }
  return images
}

const renderFinal = (src: string, dest: string): Promise<string> =>
  spawnText([
    "magick",
    src,
    "-filter",
    "Lanczos",
    "-resize",
    `${GEOMETRY}^`,
    "-gravity",
    "center",
    "-extent",
    GEOMETRY,
    "-unsharp",
    "0x0.6",
    "-quality",
    "95",
    dest,
  ])

const main = async (): Promise<void> => {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const force = args.includes("--force")

  if (!existsSync(SOURCE_ROOT)) throw new Error(`Source root not found: ${SOURCE_ROOT}`)
  if (!dryRun) mkdirSync(OUTPUT_ROOT, { recursive: true })

  const folders = readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  console.log(`${folders.length} wallpapers -> ${OUTPUT_ROOT}`)
  let rendered = 0
  let skipped = 0
  let failed = 0

  for (const folder of folders) {
    const dest = join(OUTPUT_ROOT, `${folder}.png`)
    if (!force && existsSync(dest) && statSync(dest).size > 0) {
      skipped++
      continue
    }

    const files = readdirSync(join(SOURCE_ROOT, folder))
      .filter((name) => name.toLowerCase().endsWith(".jpg"))
      .map((name) => join(SOURCE_ROOT, folder, name))
    let best: SourceImage | undefined
    try {
      best = pickBestSource(await identifyFolder(files))
    } catch (error) {
      console.warn(`  ! ${folder}: identify failed (${String(error)})`)
      failed++
      continue
    }
    if (best === undefined) {
      console.warn(`  ! ${folder}: no usable source image`)
      failed++
      continue
    }

    const srcLabel = best.path.split("/").at(-1) ?? best.path
    if (dryRun) {
      console.log(`  ${folder}.png <- ${srcLabel} (${best.width}x${best.height})`)
      continue
    }
    try {
      await renderFinal(best.path, dest)
      rendered++
      console.log(`✓ ${folder}.png <- ${srcLabel} (${best.width}x${best.height})`)
    } catch (error) {
      failed++
      console.warn(`  ! ${folder}: render failed (${String(error)})`)
    }
  }

  console.log(`\nDone. ${rendered} rendered, ${skipped} skipped (existing), ${failed} failed.`)
  console.log(`Output: ${OUTPUT_ROOT}`)
}

if (import.meta.main) await main()
