import {
  type Sending,
  writeMessage,
} from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  readingFor,
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Read,
  Asked as Sought,
} from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import {
  CHAPTER,
  noticeOf,
  PLAYER,
  STEP_SENDER,
  statusOf,
  stepIn,
  type TurnStep,
  WORLD_BUILDER,
  workingSaid,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticedOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const MAKER = "chapter writing <chapter-writing@alanwalton.com>"

const SLUG = "slug"

const POSITION = "position"

const STATUS = "stepStatus"

const STORY = "story"

const MASTER = "coordinatorAgent"

const EDITOR_STEPS = "editorSteps"

const PARTED = "/"

const PADDED = 4

const ZERO = "0"

const WORDS = `${unit.slug}${PARTED}${words.slug}`

const PROSE_HELD = "txt"

const PAGE_ENDING = ".ts"

const ANNOUNCE = "announce" as const

export type Calls = {
  readonly ask: (query: Query) => Promise<Rows>
  readonly read: (sought: Sought) => Promise<Read>
  readonly write: (asked: Writing) => Promise<Wrote>
  readonly send: Sending
}

type Chapter = {
  readonly slug: string
  readonly position: number
  readonly status: TurnStep | null
}

type Started =
  | {
      readonly slug: string
      readonly position: number
      readonly values: Readonly<Record<string, unknown>>
    }
  | { readonly refused: string }

export type ChapterMade =
  | {
      readonly kind: "made"
      readonly slug: string
      readonly at: string
      readonly told: readonly string[]
      readonly faults: readonly string[]
    }
  | { readonly kind: "refused"; readonly said: string }
  | { readonly kind: "unread"; readonly why: string }

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  read: (sought) => readingFor(sought),
  write: (asked) => writingFor(asked),
  send: (asked) => writingFor(asked),
}

function storyOf(story: string): string {
  return `${storyWritten.slug}${PARTED}${story}`
}

export function chapterAfter(story: string, chapters: readonly Chapter[]): Started {
  const busy = chapters.find((one) => one.status !== null && one.status !== PLAYER)
  if (busy !== undefined && busy.status !== null) {
    return {
      refused: `The chapter \`${busy.slug}\` is still being made. ${workingSaid(busy.status)}`,
    }
  }
  const position = Math.max(0, ...chapters.map((one) => one.position)) + 1
  const slug = `${story}-${String(position).padStart(PADDED, ZERO)}`
  return {
    slug,
    position,
    values: {
      title: `Chapter ${position}`,
      story: storyOf(story),
      position,
      ownLength: 0,
      unit: WORDS,
      prose: PROSE_HELD,
      stepStatus: statusOf(WORLD_BUILDER),
    },
  }
}

function chaptersAsked(story: string): Query {
  return {
    pageTypeSlug: storyChapterWritten.slug,
    where: { [STORY]: { is: storyOf(story) } },
    keys: [SLUG, POSITION, STATUS],
  }
}

function storyAsked(story: string): Query {
  return {
    pageTypeSlug: storyWritten.slug,
    where: { [SLUG]: { is: story } },
    keys: [SLUG, MASTER, EDITOR_STEPS],
  }
}

export function besideStory(path: string, slug: string): string {
  const folder = path.slice(0, path.lastIndexOf(PARTED) + 1)
  return `${folder}${storyChapterWritten.pluralSlug}${PARTED}${slug}.${storyChapterWritten.slug}${PAGE_ENDING}`
}

function chapterIn(row: Row): readonly Chapter[] {
  const slug = textIn(row[SLUG])
  const position = row[POSITION]
  if (slug === null || typeof position !== "number") return []
  return [{ slug, position, status: stepIn(row[STATUS]) }]
}

async function seatsTold(found: Story, story: string, at: string, send: Sending) {
  const told: string[] = []
  const faults: string[] = []
  const body = noticeOf(at, WORLD_BUILDER, [], CHAPTER)
  for (const to of noticedOf(found.master, story, found.editors)) {
    const stated = { to, from: STEP_SENDER, warrant: ANNOUNCE, body, startedOnDemand: true }
    const wrote = await writeMessage(stated, send)
    if (wrote.kind === "refused") faults.push(`\`${to}\` was not told: ${wrote.detail}`)
    else told.push(to)
  }
  return { told, faults }
}

type Story = { readonly master: string; readonly at: string; readonly editors: boolean }

type Found = Story | Exclude<ChapterMade, { kind: "made" }>

async function storyFound(story: string, calls: Calls): Promise<Found> {
  const stories = await calls.ask(storyAsked(story))
  if ("refused" in stories) return { kind: "unread", why: stories.refused }
  const row = stories.rows[0]
  if (row === undefined) return { kind: "refused", said: `No written story is named \`${story}\`.` }
  const master = textIn(row[MASTER])
  if (master === null) {
    return { kind: "refused", said: `\`${story}\` names no coordinator agent to write a chapter.` }
  }
  const read = await calls.read({ pages: [{ pageTypeSlug: storyWritten.slug, slug: story }] })
  if ("refused" in read) return { kind: "unread", why: read.refused }
  const held = read.bodies[0]
  if (held === undefined) return { kind: "unread", why: `\`${story}\` was read nowhere` }
  return { master, at: held.path, editors: row[EDITOR_STEPS] === true }
}

export async function chapterMadeFor(story: string, calls: Calls = CALLS): Promise<ChapterMade> {
  const found = await storyFound(story, calls)
  if ("kind" in found) return found
  const rows = await calls.ask(chaptersAsked(story))
  if ("refused" in rows) return { kind: "unread", why: rows.refused }
  const made = chapterAfter(story, rows.rows.flatMap(chapterIn))
  if ("refused" in made) return { kind: "refused", said: made.refused }
  const at = besideStory(found.at, made.slug)
  const wrote = await calls.write({
    writer: MAKER,
    message: `${made.slug} is started as chapter ${made.position} of ${story}`,
    pages: [
      {
        pageTypeSlug: storyChapterWritten.slug,
        slug: made.slug,
        path: at,
        fresh: true,
        values: made.values,
        bodies: { prose: "" },
      },
    ],
  })
  if ("refused" in wrote) return { kind: "unread", why: wrote.refused }
  const told = await seatsTold(found, story, at, calls.send)
  return { kind: "made", slug: made.slug, at, ...told }
}
