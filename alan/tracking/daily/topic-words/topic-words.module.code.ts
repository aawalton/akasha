import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
import { runGit } from "@akasha/git/git-answering"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import {
  type WriteOutcome,
  writeIntelligenceTopics,
  writeWisdomWords,
} from "../write-daily-points/write-daily-points.module.code.ts"

export const WORDS_COUNTED_FROM = "2026-09-06"

const WISDOM_PATHSPEC = ":(glob)alan/books/all-about-alan/topics/pages/**/*.all-about-alan-topic.ts"

const INTELLIGENCE_PATHSPEC =
  ":(glob)alan/library/book-of-everything/learn-everything-topics/pages/**/*.md"

const HUNK = "@@"

const FILE = "diff --git"

export type DayWords = {
  words: number
  shas: readonly string[]
}

export type DayTopics = {
  topics: number
  shas: readonly string[]
}

function repoRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

export function wordsIn(text: string): number {
  let count = 0
  for (const token of text.split(/\s+/)) if (token !== "") count += 1
  return count
}

// A WORD WRITTEN IS A WORD WRITTEN. What a commit took away is not subtracted from what that
// commit put down, because a day spent cutting and rewriting is a day of work, and netting the
// two scores it as a day of nothing.
export function wordsAddedInDiff(diff: string): number {
  let added = 0
  let inHunk = false
  for (const line of diff.split("\n")) {
    if (line.startsWith(FILE)) {
      inHunk = false
      continue
    }
    if (line.startsWith(HUNK)) {
      inHunk = true
      continue
    }
    if (!inHunk) continue
    if (line.startsWith("+")) added += wordsIn(line.slice(1))
  }
  return added
}

export async function commitsOn(
  root: string,
  dayStr: string,
  pathspec: string
): Promise<readonly string[]> {
  const { start, end } = getEsoDayWindow(dayStr)
  if (start.getTime() === 0 || end.getTime() === 0) {
    throw new Error(`\`${dayStr}\` names no day, so the commits landing on it cannot be asked for`)
  }
  const last = new Date(end.getTime() - 1000)
  const asked = await runGit(
    [
      "log",
      "--no-merges",
      "--format=%H",
      `--since=${start.toISOString()}`,
      `--until=${last.toISOString()}`,
      "HEAD",
      "--",
      pathspec,
    ],
    root
  )
  if (!asked.ok) {
    throw new Error(`the commits on ${dayStr} did not come back: ${asked.stderr}`)
  }
  return asked.stdout.split("\n").filter((line) => line !== "")
}

// A FILE THAT MOVED WROTE NOTHING. Without rename detection git reads a move as the whole old
// file taken away and the whole new file put down, so a path renamed would score every word in
// that file as freshly written.
export async function wordsAddedInCommit(
  root: string,
  sha: string,
  pathspec: string
): Promise<number> {
  const asked = await runGit(
    ["show", "--format=", "--unified=0", "--no-color", "--find-renames", sha, "--", pathspec],
    root
  )
  if (!asked.ok) {
    throw new Error(`the diff of ${sha} did not come back: ${asked.stderr}`)
  }
  return wordsAddedInDiff(asked.stdout)
}

export async function countWordsForDay(
  root: string,
  dayStr: string,
  pathspec: string
): Promise<DayWords> {
  const shas = await commitsOn(root, dayStr, pathspec)
  let words = 0
  for (const sha of shas) {
    words += await wordsAddedInCommit(root, sha, pathspec)
  }
  return { words, shas }
}

// A TOPIC IS THE PAGE RATHER THAN THE FILES BESIDE IT. A topic keeps its frontier, its evidence
// and its bites as markdown files of their own in the topic's folder, so counting changed files
// would score one topic worked on as three, and one topic is what Alan sat down to.
export function topicsIn(paths: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const path of paths) {
    const at = path.lastIndexOf("/")
    if (at <= 0) continue
    found.add(path.slice(0, at))
  }
  return found
}

// A FILE THAT ONLY MOVED WAS NOT WORKED ON. Git reads a move as the old path taken away and the
// new path put down, so a folder renamed would score every topic under it as a topic updated.
export async function topicsUpdatedInCommit(
  root: string,
  sha: string,
  pathspec: string
): Promise<ReadonlySet<string>> {
  const asked = await runGit(
    [
      "show",
      "--format=",
      "--name-only",
      "--no-color",
      "--find-renames",
      "--diff-filter=AM",
      sha,
      "--",
      pathspec,
    ],
    root
  )
  if (!asked.ok) {
    throw new Error(`the files ${sha} changed did not come back: ${asked.stderr}`)
  }
  return topicsIn(asked.stdout.split("\n"))
}

export async function countTopicsForDay(
  root: string,
  dayStr: string,
  pathspec: string
): Promise<DayTopics> {
  const shas = await commitsOn(root, dayStr, pathspec)
  const found = new Set<string>()
  for (const sha of shas) {
    for (const topic of await topicsUpdatedInCommit(root, sha, pathspec)) found.add(topic)
  }
  return { topics: found.size, shas }
}

export function refuseBeforeStart(dayStr: string, field: string): undefined {
  if (dayStr >= WORDS_COUNTED_FROM) return undefined
  throw new Error(
    `${dayStr} is before ${WORDS_COUNTED_FROM}, so it carries no ${field} — Alan ruled these ` +
      "counted forward from the day they began, and writing one onto an earlier day would state a " +
      "figure he never earned as one he did"
  )
}

export async function rollupWisdomWordsForDay(
  dayStr: string
): Promise<{ wisdomWords: number; shas: readonly string[]; outcome: WriteOutcome }> {
  refuseBeforeStart(dayStr, "wisdom words")
  const { words, shas } = await countWordsForDay(repoRoot(), dayStr, WISDOM_PATHSPEC)
  const outcome = await writeWisdomWords(dayStr, words)
  return { wisdomWords: words, shas, outcome }
}

export async function rollupIntelligenceTopicsForDay(
  dayStr: string
): Promise<{ intelligenceTopics: number; shas: readonly string[]; outcome: WriteOutcome }> {
  refuseBeforeStart(dayStr, "intelligence topics")
  const { topics, shas } = await countTopicsForDay(repoRoot(), dayStr, INTELLIGENCE_PATHSPEC)
  const outcome = await writeIntelligenceTopics(dayStr, topics)
  return { intelligenceTopics: topics, shas, outcome }
}

export function countWisdomWordsForDay(root: string, dayStr: string): Promise<DayWords> {
  return countWordsForDay(root, dayStr, WISDOM_PATHSPEC)
}

export function countIntelligenceTopicsForDay(root: string, dayStr: string): Promise<DayTopics> {
  return countTopicsForDay(root, dayStr, INTELLIGENCE_PATHSPEC)
}

type Landing = readonly [string, () => Promise<{ outcome: WriteOutcome }>]

if (import.meta.main) {
  const day = getEsoDayStr(new Date())
  // THE TWO COUNTS LAND ONE AFTER THE OTHER. Each patches the same day page, so counting them
  // together would put two writes on one file, and the second would land against a body the first
  // had already moved out from under it.
  const landings: readonly Landing[] = [
    ["wisdom words", () => rollupWisdomWordsForDay(day)],
    ["intelligence topics", () => rollupIntelligenceTopicsForDay(day)],
  ]
  const landed: string[] = []
  for (const [field, rollup] of landings) {
    try {
      const { outcome } = await rollup()
      landed.push(`${field} ${outcome}`)
    } catch (thrown) {
      const why = thrown instanceof Error ? thrown.message : String(thrown)
      process.stderr.write(`the ${field} for ${day} did not land: ${why}\n`)
    }
  }
  if (landed.length === 0) process.exit(1)
  process.stdout.write(`${day} carries ${landed.join(" and ")}\n`)
}
