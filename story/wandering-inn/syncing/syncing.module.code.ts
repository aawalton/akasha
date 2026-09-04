import {
  chapterTitleOf,
  isPatronTitle,
  strippedOfTrailingNav,
} from "../chapter/chapter.module.code.ts"
import {
  assertStoryStands,
  fileChapter,
  filedChapterLinks,
} from "../chapter-filing/chapter-filing.module.code.ts"
import { type ListedChapter, openSite, type Site } from "../site/site.module.code.ts"
import {
  type RunCounts,
  recordingRun,
} from "../sync-run-recording/sync-run-recording.module.code.ts"

const SOURCE = "wandering-inn"
const BETWEEN_CHAPTERS_MS = 1000

function numberAfter(argv: readonly string[], flag: string): number | null {
  const at = argv.indexOf(flag)
  if (at === -1) return null
  const raw = argv[at + 1]
  const read = Number(raw)
  if (!Number.isInteger(read) || read <= 0) {
    throw new Error(`${flag} expects a positive whole number, and was given: ${raw ?? "(nothing)"}`)
  }
  return read
}

interface Tally {
  created: number
  skipped: number
  failed: number
}

async function takeChapter(
  site: Site,
  listed: ListedChapter,
  at: string,
  dryRun: boolean,
  tally: Tally
): Promise<void> {
  if (isPatronTitle(listed.title)) {
    console.log(`  ${at} chapter ${listed.position}: patron early access by title; left`)
    tally.skipped += 1
    return
  }

  const read = await site.readChapter(listed.url)
  if (read.patronOnly) {
    console.log(`  ${at} chapter ${listed.position}: patron early access by content; left`)
    tally.skipped += 1
    return
  }

  const text = strippedOfTrailingNav(read.text).trim()
  if (text === "") {
    console.log(`  ${at} chapter ${listed.position}: no prose stood on the page; left`)
    tally.skipped += 1
    return
  }

  const title = chapterTitleOf(read.ogTitle, read.docTitle, listed.title)
  const url = read.ogUrl === "" ? listed.url : read.ogUrl

  if (dryRun) {
    console.log(`  ${at} chapter ${listed.position}: would file "${title}" (${text.length} chars)`)
    tally.skipped += 1
    return
  }

  const where = fileChapter({ position: listed.position, title, url, text })
  console.log(`  ${at} chapter ${listed.position}: filed "${title}" at ${where}`)
  tally.created += 1
}

export async function syncWanderingInn(argv: readonly string[]): Promise<RunCounts> {
  const dryRun = argv.includes("--dry-run")
  const ceiling = numberAfter(argv, "--limit")

  const site = await openSite()
  const tally: Tally = { created: 0, skipped: 0, failed: 0 }
  try {
    assertStoryStands()

    const filed = filedChapterLinks()
    console.log(`${filed.size} chapter(s) already filed`)

    const listed = await site.readContents()
    console.log(`${listed.length} chapter(s) listed in the table of contents`)

    const fresh = listed.filter((one) => !filed.has(one.url))
    tally.skipped += listed.length - fresh.length
    console.log(`${fresh.length} listed chapter(s) are not filed yet`)

    const taking = ceiling === null ? fresh : fresh.slice(0, ceiling)
    if (taking.length < fresh.length) {
      tally.skipped += fresh.length - taking.length
      console.log(`--limit ${ceiling} leaves ${fresh.length - taking.length} of them for next time`)
    }

    for (const [i, one] of taking.entries()) {
      const at = `${i + 1}/${taking.length}`
      try {
        await takeChapter(site, one, at, dryRun, tally)
      } catch (thrown) {
        console.log(`  ${at} chapter ${one.position}: failed — ${String(thrown)}`)
        tally.failed += 1
      }
      if (i + 1 < taking.length) await Bun.sleep(BETWEEN_CHAPTERS_MS)
    }
  } finally {
    await site.close()
  }

  console.log(
    `filed ${tally.created}, left ${tally.skipped}, failed ${tally.failed} ` +
      `(${tally.created + tally.skipped + tally.failed} chapters seen)`
  )
  return { created: tally.created, updated: 0, skipped: tally.skipped, failed: tally.failed }
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--dry-run")) {
    const counts = await syncWanderingInn(argv)
    return counts.failed > 0 ? 1 : 0
  }
  const counts = await recordingRun(SOURCE, () => syncWanderingInn(argv))
  return counts.failed > 0 ? 1 : 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
