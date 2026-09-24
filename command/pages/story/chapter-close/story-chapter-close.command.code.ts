import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import { through as throughArgument } from "akasha/command/argument/pages/through.argument.ts"
import { title as titleArgument } from "akasha/command/argument/pages/title.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyChapterClose as page } from "akasha/command/pages/story/chapter-close/story-chapter-close.command.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [storyArgument, throughArgument, titleArgument] as const

const PROSE = "prose"
const HELD = "txt"
const UTF8 = "utf8"
const PARTED = "/"
const GAP = "\n\n"
const BREAK = "\n"
const PADDED = 4
const ZERO = "0"
const WORDS = `${unit.slug}/${words.slug}` as const
const COLLECTIONS = "partOfCollections"
const STORY = "story"
const POSITION = "position"

const A_NOT_SLUG = /[^a-z0-9]+/g
const AN_EDGE_DASH = /^-|-$/g

export type Taken = { readonly story: string; readonly through: number; readonly title: string }

export type Read = Taken | { readonly refused: string }

export type Turn = { readonly at: string; readonly position: number }

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const story = held.story.trim()
  if (story === "") return { refused: `\`${storyArgument.said}\` names no story` }
  const title = held.title.trim()
  if (title === "") return { refused: `\`${titleArgument.said}\` names no title` }
  const through = held.through
  if (!Number.isInteger(through) || through < 1) {
    return { refused: `\`${throughArgument.said}\` takes a whole number of one or more` }
  }
  return { story, through, title }
}

export function slugOf(title: string): string {
  return title.toLowerCase().replace(A_NOT_SLUG, "-").replace(AN_EDGE_DASH, "")
}

export function chapterSlugOf(story: string, position: number, title: string): string {
  return `${story}-${String(position).padStart(PADDED, ZERO)}-${slugOf(title)}`
}

export function proseOf(title: string, turns: readonly string[]): string {
  return `${[`# ${title}`, ...turns.map((one) => one.trim())].join(GAP)}${BREAK}`
}

export function openThrough(turns: readonly Turn[], through: number): readonly Turn[] {
  return turns
    .filter((one) => one.position <= through)
    .toSorted((one, other) => one.position - other.position)
}

function storyOf(slug: string): string {
  const parted = slug.lastIndexOf(PARTED)
  return parted < 0 ? slug : slug.slice(parted + 1)
}

function turnsOf(root: string, named: string): readonly Turn[] {
  const found: Turn[] = []
  for (const one of valuesOfType(root, storyTurnPlayed.slug)) {
    const within = one.value[COLLECTIONS]
    const position = one.value[POSITION]
    if (!Array.isArray(within) || !within.includes(named)) continue
    if (typeof position !== "number") continue
    found.push({ at: one.path, position })
  }
  return found
}

function lastChapterOf(root: string, named: string): number {
  let last = 0
  for (const one of valuesOfType(root, storyChapterPlayed.slug)) {
    const position = one.value[POSITION]
    if (one.value[STORY] !== named || typeof position !== "number") continue
    last = Math.max(last, position)
  }
  return last
}

function proseAt(root: string, at: string): string | null {
  const beside = besideAt(at, PROSE, HELD)
  if (beside === null) return null
  const path = join(root, beside)
  if (statSync(path, { throwIfNoEntry: false }) === undefined) return null
  return readFileSync(path, UTF8)
}

async function closed(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const slug = storyOf(held.story)
  const listed = listedAt(given.root, storyPlayed.slug, slug)[0]
  if (listed === undefined) return refused(`\`${held.story}\` names no played story here`, DATA)
  const named = `${storyPlayed.slug}/${slug}`
  const turns = openThrough(turnsOf(given.root, named), held.through)
  if (!turns.some((one) => one.position === held.through)) {
    return refused(`\`${slug}\` has no open turn numbered ${held.through}`, DATA)
  }
  const texts: string[] = []
  for (const one of turns) {
    const text = proseAt(given.root, one.at)
    if (text === null) return refused(`\`${one.at}\` has no prose file beside it`, DATA)
    texts.push(text)
  }
  const position = lastChapterOf(given.root, named) + 1
  const chapterSlug = chapterSlugOf(slug, position, held.title)
  const prose = proseOf(held.title, texts)
  const folder = `${listed.path.slice(0, listed.path.lastIndexOf(PARTED))}${PARTED}${storyChapterPlayed.pluralSlug}`
  const naming: Naming = {
    pageTypeSlug: storyChapterPlayed.slug,
    slug: chapterSlug,
    path: `${folder}${PARTED}${chapterSlug}.${storyChapterPlayed.slug}.ts`,
    values: {
      title: held.title,
      story: named,
      position,
      ownLength: wordCount(prose),
      unit: WORDS,
      prose: HELD,
    },
    bodies: { prose },
  }
  const folded = foldedFor(given.root, [naming])
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(
    given.root,
    [...folded.puts.map(putting), ...turns.map((one) => taking(one.at))],
    `${held.title} closes as chapter ${position} of ${slug}, from its turns ${turns[0]?.position} through ${held.through}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([chapterSlug, ...turns.map((one) => `took\t${one.at}`)])
}

export async function storyChapterClose(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await closed(done, argv, given, landing))
}
