import { readdirSync, readFileSync } from "node:fs"
import { parseFrontmatter, listField, textField } from "../page/frontmatter.ts"
import { akashaRoot } from "../repo/roots/roots.ts"
import { type GatedAct, type GatedBody, landBodies } from "../tools/lib/gated-landing.ts"
import { fetchHtml, parseChapterProse, parseFictionPage, royalRoadUrl } from "../tools/lib/royal-road.ts"
import type { RawChapter } from "../tools/lib/royal-road.ts"

const ROOT = akashaRoot()
const STORY_TYPE = "story-read-royal-road"
const CHAPTER_TYPE = "story-chapter-royal-road"
const STORY_DIR = `pages/${STORY_TYPE}`
const CHAPTER_DIR = `pages/${CHAPTER_TYPE}`
const REQUEST_DELAY_MS = 1500
const SLUG_CEILING = 50
const WRITER = "royal-road-sync-writer"
const BATCH_CEILING = 50

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function slugify(title: string): string {
  const whole = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "")
  if (whole.length <= SLUG_CEILING) return whole
  const words = whole.split("-")
  let out = words[0] ?? ""
  for (const word of words.slice(1)) {
    if (out.length + 1 + word.length > SLUG_CEILING) break
    out = `${out}-${word}`
  }
  return out
}

interface Story {
  readonly home: string
  readonly slug: string
  readonly royalRoadId: string
  readonly relPath: string
  readonly path: string
  readonly body: string
  readonly status: string | null
  readonly tags: readonly string[]
}

function storyPages(): readonly string[] {
  return [...new Bun.Glob(`${STORY_DIR}/**/*.md`).scanSync({ cwd: ROOT })].sort()
}

function readStories(only: string | undefined): readonly Story[] {
  const out: Story[] = []
  for (const relPath of storyPages()) {
    const lastSlash = relPath.lastIndexOf("/")
    const path = `${ROOT}/${relPath}`
    const body = readFileSync(path, "utf8")
    const fm = parseFrontmatter(body)
    const slug = textField(fm, "slug")
    if (slug === null) {
      console.log(`skip ${relPath}: no slug`)
      continue
    }
    if (only !== undefined && slug !== only) continue
    const royalRoadId = textField(fm, "royalRoadId")
    if (royalRoadId === null) {
      console.log(`skip ${slug}: no royalRoadId`)
      continue
    }
    out.push({
      home: relPath.slice(STORY_DIR.length + 1, lastSlash),
      slug,
      royalRoadId,
      relPath,
      path,
      body,
      status: textField(fm, "royalRoadSeriesStatus"),
      tags: listField(fm, "royalRoadTags"),
    })
  }
  return out
}

interface Held {
  readonly ids: ReadonlySet<string>
  readonly slugs: ReadonlySet<string>
}

function readHeld(home: string): Held {
  const ids = new Set<string>()
  const slugs = new Set<string>()
  const dir = `${ROOT}/${CHAPTER_DIR}/${home}`
  let files: readonly string[]
  try {
    files = readdirSync(dir)
  } catch {
    return { ids, slugs }
  }
  for (const file of files) {
    if (!file.endsWith(".md")) continue
    const fm = parseFrontmatter(readFileSync(`${dir}/${file}`, "utf8"))
    const id = textField(fm, "royalRoadId")
    if (id !== null) ids.add(id)
    const slug = textField(fm, "slug")
    if (slug !== null) slugs.add(slug)
  }
  return { ids, slugs }
}

function quote(value: string): string {
  return JSON.stringify(value)
}

export function composeChapter(
  chapter: RawChapter,
  partOf: string,
  slug: string,
  position: number,
  text: string,
  wordCount: number
): string {
  const lines = [
    "---",
    `page-type-slug: ${CHAPTER_TYPE}`,
    `title: ${quote(chapter.title)}`,
    `slug: ${slug}`,
    `partOf: ${partOf}`,
    `position: ${position}`,
    `ownLength: ${wordCount}`,
    "unit: words",
    `publishedAt: ${chapter.date.slice(0, 10)}`,
    `link: ${quote(royalRoadUrl(chapter.url))}`,
    `royalRoadId: ${quote(chapter.id)}`,
    "---",
    "",
    text,
    "",
  ]
  return lines.join("\n")
}

const STATUS_KEPT = new Set(["ongoing", "completed", "hiatus"])

function restatedStory(story: Story, status: string | null, tags: readonly string[]): string | null {
  let body = story.body
  const wanted = status === null ? null : status.toLowerCase()
  if (wanted !== null && STATUS_KEPT.has(wanted) && wanted !== story.status) {
    body = body.replace(/^royalRoadSeriesStatus: .*$/m, `royalRoadSeriesStatus: ${wanted}`)
  }
  const sameTags =
    tags.length === story.tags.length && tags.every((tag, i) => tag === story.tags[i])
  if (tags.length > 0 && !sameTags) {
    const block = ["royalRoadTags:", ...tags.map((tag) => `  - ${quote(tag)}`)].join("\n")
    body = body.replace(/^royalRoadTags:\n(?:  - .*\n)*/m, `${block}\n`)
  }
  return body === story.body ? null : body
}

interface Counts {
  composed: number
  skipped: number
  failed: number
  restated: number
  refused: number
}

async function syncStory(
  story: Story,
  counts: Counts,
  budget: { left: number },
  landing: GatedBody[]
): Promise<void> {
  const fictionUrl = royalRoadUrl(`/fiction/${story.royalRoadId}/${story.slug}`)
  const fiction = parseFictionPage(await fetchHtml(fictionUrl))
  await delay(REQUEST_DELAY_MS)

  const held = readHeld(story.home)
  const taken = new Set(held.slugs)
  const pending = fiction.chapters.filter(
    (one) => one.visible && one.isUnlocked && !held.ids.has(one.id)
  )
  if (pending.length === 0) {
    console.log(`  ${story.slug}: ${fiction.chapters.length} listed, nothing new`)
  } else {
    console.log(`  ${story.slug}: ${fiction.chapters.length} listed, ${pending.length} new`)
  }

  for (const chapter of pending) {
    if (budget.left <= 0) {
      counts.skipped += 1
      continue
    }
    budget.left -= 1
    try {
      const prose = parseChapterProse(await fetchHtml(royalRoadUrl(chapter.url)))
      await delay(REQUEST_DELAY_MS)
      if (prose === null) {
        console.log(`    no prose found: ${chapter.title}`)
        counts.failed += 1
        continue
      }
      const base = slugify(chapter.title)
      const position = chapter.order + 1
      const stem = `${String(position).padStart(4, "0")}-${base === "" ? chapter.id : base}`
      const slug = taken.has(stem) ? `${stem}-${chapter.id}` : stem
      taken.add(slug)
      const fileName = `${slug}.${CHAPTER_TYPE}.md`
      landing.push({
        relPath: `${CHAPTER_DIR}/${story.home}/${fileName}`,
        body: composeChapter(chapter, story.slug, slug, position, prose.text, prose.wordCount),
      })
      console.log(`    + ${fileName} (${prose.wordCount} words)`)
      counts.composed += 1
    } catch (error) {
      console.log(`    failed: ${chapter.title} — ${String(error)}`)
      counts.failed += 1
    }
  }

  const restated = restatedStory(story, fiction.meta.status, fiction.meta.tags)
  if (restated !== null) {
    landing.push({ relPath: story.relPath, body: restated })
    console.log(`    restated ${story.slug}`)
    counts.restated += 1
  }
}

export function landInBatches(bodies: readonly GatedBody[], counts: Counts): void {
  for (let at = 0; at < bodies.length; at += BATCH_CEILING) {
    const batch = bodies.slice(at, at + BATCH_CEILING)
    const act: GatedAct = {
      repo: "akasha",
      writer: WRITER,
      message: `royal road sync ${batch.length} file(s)`,
      root: ROOT,
    }
    const landed = landBodies(act, batch)
    if (!landed.ok) {
      counts.refused += batch.length
      console.log(`  refused ${batch.length} file(s): ${landed.why}`)
      continue
    }
    const where = landed.sha === null ? "no change" : landed.sha
    console.log(`  landed ${batch.length} file(s): ${where}`)
    if (landed.unpushed !== null) console.log(`  committed but NOT pushed`)
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  const only = argv.includes("--story") ? argv[argv.indexOf("--story") + 1] : undefined
  const limitRaw = argv.includes("--limit") ? argv[argv.indexOf("--limit") + 1] : undefined
  const budget = { left: limitRaw === undefined ? Number.MAX_SAFE_INTEGER : Number(limitRaw) }

  const stories = readStories(only)
  if (stories.length === 0 && only === undefined) {
    console.log(`royal road sync: no ${STORY_TYPE} page stands under ${ROOT}/${STORY_DIR}`)
    return 1
  }
  console.log(`royal road sync: ${stories.length} stor${stories.length === 1 ? "y" : "ies"}`)
  const counts: Counts = { composed: 0, skipped: 0, failed: 0, restated: 0, refused: 0 }
  const landing: GatedBody[] = []

  for (const story of stories) {
    try {
      await syncStory(story, counts, budget, landing)
    } catch (error) {
      console.log(`  ${story.slug}: failed — ${String(error)}`)
      counts.failed += 1
    }
  }

  if (landing.length === 0) {
    console.log("nothing to land")
  } else if (argv.includes("--commit")) {
    landInBatches(landing, counts)
  } else {
    console.log(`${landing.length} file(s) composed and not landed; pass --commit to put them through the write command`)
    for (const one of landing) console.log(`    ${one.relPath}`)
  }

  console.log(
    `composed ${counts.composed} chapter(s), restated ${counts.restated} story file(s), ` +
      `skipped ${counts.skipped} over budget, ${counts.failed} failed, ${counts.refused} refused`
  )
  if (counts.refused > 0) return 1
  return counts.failed > 0 && counts.composed === 0 ? 1 : 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
