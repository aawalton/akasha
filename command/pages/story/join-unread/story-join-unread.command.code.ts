import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { chapterLimit as chapterLimitArgument } from "akasha/command/argument/pages/chapter-limit.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyJoinUnread as page } from "akasha/command/pages/story/join-unread/story-join-unread.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { filing } from "akasha/page/service/modules/file-answering/file-answering.module.code.ts"
import {
  asking,
  type Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  composedFor,
  type Put,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { chapterWords } from "akasha/story/engine/core/modules/chapter-words/chapter-words.module.code.ts"
import { everythingUnreadFolder } from "akasha/story/world/stories/read/properties/everything-unread-folder.named-folder-property.ts"
import {
  CHAPTER_PAGE_TYPE,
  STORY_ADDRESS,
  STORY_PAGE_TYPE,
  STORY_SLUG,
} from "akasha/story/world/stories/read/wandering-inn/modules/chapter/chapter.module.code.ts"

const NAMED = [chapterLimitArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const WORDS = `${unit.slug}/${words.slug}` as const

export const JOINED_SLUG = `${STORY_SLUG}-${everythingUnreadFolder.folderName}`

const JOINED_TITLE = "Everything unread"

const PROSE = "prose"

const TXT = "txt"

const PAGE_ENDING = ".ts"

const KEYS = ["slug", "title", "position", "ownLength", "ownProgress", "publishedAt"]

const DECODER = new TextDecoder()

export type Chapter = {
  readonly slug: string
  readonly title: string
  readonly position: number
  readonly publishedAt: string | null
}

function unreadRow(row: Row): boolean {
  const progress = row["ownProgress"]
  if (typeof progress !== "number") return true
  const length = row["ownLength"]
  return typeof length === "number" && progress < length
}

export function unreadIn(rows: readonly Row[]): readonly Chapter[] {
  const found: Chapter[] = []
  for (const row of rows) {
    const slug = row["slug"]
    const title = row["title"]
    const position = row["position"]
    const day = row["publishedAt"]
    if (typeof slug !== "string" || slug === JOINED_SLUG) continue
    if (typeof title !== "string" || typeof position !== "number") continue
    if (!unreadRow(row)) continue
    found.push({ slug, title, position, publishedAt: typeof day === "string" ? day : null })
  }
  return found.sort((one, two) => one.position - two.position)
}

export function limitedTo(
  chapters: readonly Chapter[],
  limit: number | undefined
): readonly Chapter[] {
  return limit === undefined ? chapters : chapters.slice(0, limit)
}

export function headingOf(chapter: Chapter): string {
  return chapter.publishedAt === null ? chapter.title : `${chapter.title} (${chapter.publishedAt})`
}

export type Held = {
  readonly chapter: Chapter
  readonly prose: string
}

export function joinedFrom(held: readonly Held[]): string {
  const parts = held.map((one) => `${headingOf(one.chapter)}\n\n${one.prose.trim()}`)
  return `${parts.join("\n\n")}\n`
}

type Refusal = { readonly refused: string }

function proseOf(root: string, chapter: Chapter): string | Refusal {
  const read = filing(root, { pageTypeSlug: CHAPTER_PAGE_TYPE, slug: chapter.slug, key: PROSE })
  if ("refused" in read) return { refused: `${chapter.slug} has no prose to join: ${read.refused}` }
  return DECODER.decode(read.bytes)
}

function joinedAt(root: string): string | Refusal {
  const listed = listedAt(root, STORY_PAGE_TYPE, STORY_SLUG)
  const story = listed.length === 1 ? listed[0]?.path : undefined
  if (story === undefined) {
    return { refused: `${listed.length} pages sit at ${STORY_ADDRESS}, so no folder is beside it` }
  }
  const named = `${JOINED_SLUG}.${CHAPTER_PAGE_TYPE}${PAGE_ENDING}`
  return join(dirname(story), everythingUnreadFolder.folderName, named)
}

function alreadyHolds(root: string, put: Put): boolean {
  const at = join(root, put.path)
  return existsSync(at) && readFileSync(at, "utf8") === put.content
}

type Joined = {
  readonly chapters: number
  readonly words: number
  readonly path: string
  readonly commit: string | null
}

async function joinedOver(
  root: string,
  limit: number | undefined,
  landing: Landing,
  done: string[]
): Promise<Joined | Refusal> {
  const asked = asking(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    where: { story: { is: STORY_ADDRESS } },
    keys: KEYS,
  })
  if ("refused" in asked) return { refused: `the chapters went unread: ${asked.refused}` }
  const chapters = limitedTo(unreadIn(asked.rows), limit)
  if (chapters.length === 0) {
    return { refused: `no chapter of ${STORY_ADDRESS} is unread, so nothing is joined` }
  }
  const held: Held[] = []
  for (const chapter of chapters) {
    const prose = proseOf(root, chapter)
    if (typeof prose !== "string") return prose
    held.push({ chapter, prose })
  }
  const text = joinedFrom(held)
  const counted = chapterWords(text)
  const at = joinedAt(root)
  if (typeof at !== "string") return at
  const composed = composedFor(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug: JOINED_SLUG,
    path: at,
    values: {
      title: JOINED_TITLE,
      story: STORY_ADDRESS,
      ownLength: counted,
      unit: WORDS,
      prose: TXT,
    },
    bodies: { prose: text },
  })
  if ("refused" in composed) return { refused: `nothing was composed: ${composed.refused}` }
  if (composed.removes.length > 0) {
    return { refused: `${composed.removes.length} files would be taken away, and this takes none` }
  }
  const path = composed.put.path
  const moved = [composed.put, ...composed.parts].filter((one) => !alreadyHolds(root, one))
  if (moved.length === 0) return { chapters: chapters.length, words: counted, path, commit: null }
  const message = `join ${chapters.length} unread chapters of ${STORY_ADDRESS} into one chapter`
  const answer = await landing(
    root,
    moved.map((one) => ({ at: PUT, given: { at: one.path, body: one.content } }) as const),
    message,
    { done }
  )
  const wrong = refusalsIn(answer)
  if (wrong.length > 0) return { refused: `${message} did not land: ${wrong.join("; ")}` }
  const commit = "commit" in answer ? answer.commit : null
  return { chapters: chapters.length, words: counted, path, commit }
}

function limitIn(argv: readonly string[], calledAs: string): number | undefined | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const limit = read.taken.chapterLimit
  if (limit === undefined) return undefined
  if (!Number.isInteger(limit) || limit < 1) {
    return { refused: `\`${chapterLimitArgument.said}\` takes a whole number of one or more` }
  }
  return limit
}

async function joined(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const limit = limitIn(argv, given.calledAs)
  if (typeof limit === "object") return refused(limit.refused, INPUT)
  const said = await joinedOver(given.root, limit, landing, done)
  if ("refused" in said) return refused(said.refused, DATA)
  return told([
    `chapters\t${said.chapters}`,
    `words\t${said.words}`,
    `page\t${said.path}`,
    said.commit === null ? "unchanged\ttrue" : `commit\t${said.commit}`,
  ])
}

export async function storyJoinUnread(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await joined(done, argv, given, landing))
}
