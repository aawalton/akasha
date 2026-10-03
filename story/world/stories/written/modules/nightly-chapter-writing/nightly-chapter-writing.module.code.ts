import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  PLAYER,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  type ChapterMade,
  chapterMadeFor,
} from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const SLUG = "slug"

const FOLLOWING = "following"

const MASTER = "coordinatorAgent"

const BACKLOG = "wordBacklog"

const REMAINING = "ownRemaining"

const STORY = "story"

const STATUS = "stepStatus"

const COMPLETED = "completedAt"

const UNSTATED_BACKLOG = 0

const PARTED = "/"

export type Asking = (query: Query) => Promise<Rows>

export type Making = (story: string) => Promise<ChapterMade>

export type Story = {
  readonly slug: string
  readonly following: boolean
  readonly master: string | null
  readonly wordBacklog: number | null
}

export type Chapter = {
  readonly slug: string
  readonly status: TurnStep | null
  readonly completed: boolean
  readonly remaining: number
}

export type Due = { readonly due: boolean; readonly why: string }

export type BacklogKept = {
  readonly said: string
  readonly failed: boolean
  readonly faults: readonly string[]
}

export function storiesAsked(story?: string): Query {
  const where = story === undefined ? {} : { where: { [SLUG]: { is: story } } }
  return { pageTypeSlug: storyWritten.slug, ...where, keys: [SLUG, FOLLOWING, MASTER, BACKLOG] }
}

export function chaptersAsked(story: string): Query {
  return {
    pageTypeSlug: storyChapterWritten.slug,
    where: { [STORY]: { is: `${storyWritten.slug}${PARTED}${story}` } },
    keys: [SLUG, STATUS, COMPLETED, REMAINING],
  }
}

function storyIn(row: Row): readonly Story[] {
  const slug = textIn(row[SLUG])
  if (slug === null) return []
  const backlog = row[BACKLOG]
  return [
    {
      slug,
      following: row[FOLLOWING] === true,
      master: textIn(row[MASTER]),
      wordBacklog: typeof backlog === "number" ? backlog : null,
    },
  ]
}

function chapterIn(row: Row): readonly Chapter[] {
  const slug = textIn(row[SLUG])
  if (slug === null) return []
  const left = row[REMAINING]
  return [
    {
      slug,
      status: stepIn(row[STATUS]),
      completed: textIn(row[COMPLETED]) !== null,
      remaining: typeof left === "number" ? Math.max(0, left) : 0,
    },
  ]
}

function unreadWordsOf(chapters: readonly Chapter[]): number {
  return chapters.filter((one) => !one.completed).reduce((sum, one) => sum + one.remaining, 0)
}

export function dueFor(story: Story, chapters: readonly Chapter[]): Due {
  if (!story.following) return { due: false, why: "not followed" }
  if (story.master === null) return { due: false, why: "names no coordinator agent" }
  const busy = chapters.find((one) => one.status !== null && one.status !== PLAYER)
  if (busy !== undefined) {
    return { due: false, why: `\`${busy.slug}\` is mid-step at ${String(busy.status)}` }
  }
  const words = unreadWordsOf(chapters)
  const backlog = story.wordBacklog ?? UNSTATED_BACKLOG
  if (words <= backlog) {
    return { due: true, why: `${words} unread words, at most the word backlog of ${backlog}` }
  }
  const unread = chapters.filter((one) => !one.completed).map((one) => one.slug)
  const over = `${words} unread words, over the word backlog of ${backlog}`
  return { due: false, why: `${over}: ${unread.join(", ")}` }
}

function madeKept(story: string, made: ChapterMade): BacklogKept {
  if (made.kind === "refused") {
    return { said: `${story}\trefused\t${made.said}`, failed: true, faults: [] }
  }
  if (made.kind === "unread")
    return { said: `${story}\tfailed\t${made.why}`, failed: true, faults: [] }
  return { said: `${story}\tstarted\t${made.slug}\t${made.at}`, failed: false, faults: made.faults }
}

function keptSaid(kept: BacklogKept): string {
  return [kept.said, ...kept.faults.map((one) => `\tfault\t${one}`)].join("\n")
}

function skipped(story: string, why: string, failed: boolean): BacklogKept {
  return { said: `${story}\tskipped\t${why}`, failed, faults: [] }
}

async function storyKept(
  story: Story,
  dry: boolean,
  ask: Asking,
  making: Making
): Promise<BacklogKept> {
  const chapters = await ask(chaptersAsked(story.slug))
  if ("refused" in chapters)
    return skipped(story.slug, `chapters unread: ${chapters.refused}`, true)
  const due = dueFor(story, chapters.rows.flatMap(chapterIn))
  if (!due.due) return skipped(story.slug, due.why, false)
  if (dry) return { said: `${story.slug}\twould write\t${due.why}`, failed: false, faults: [] }
  return madeKept(story.slug, await making(story.slug))
}

export async function backlogKept(
  story: string,
  dry = false,
  ask: Asking = (query) => askingFor(query),
  making: Making = chapterMadeFor
): Promise<BacklogKept> {
  const stories = await ask(storiesAsked(story))
  if ("refused" in stories) return skipped(story, `stories unread: ${stories.refused}`, true)
  const found = stories.rows.flatMap(storyIn).find((one) => one.slug === story)
  if (found === undefined) return skipped(story, "no written story is named so", true)
  return await storyKept(found, dry, ask, making)
}

export async function nightlyChapterWriting(
  dry: boolean,
  ask: Asking = (query) => askingFor(query),
  making: Making = chapterMadeFor
): Promise<readonly string[]> {
  const stories = await ask(storiesAsked())
  if ("refused" in stories) return [`stories unread\t${stories.refused}`]
  const said: string[] = []
  for (const story of stories.rows.flatMap(storyIn)) {
    said.push(keptSaid(await storyKept(story, dry, ask, making)))
  }
  return said
}
