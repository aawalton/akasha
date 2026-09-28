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

const STORY = "story"

const STATUS = "stepStatus"

const COMPLETED = "completedAt"

const PARTED = "/"

export type Asking = (query: Query) => Promise<Rows>

export type Making = (story: string) => Promise<ChapterMade>

export type Story = {
  readonly slug: string
  readonly following: boolean
  readonly master: string | null
}

export type Chapter = {
  readonly slug: string
  readonly status: TurnStep | null
  readonly completed: boolean
}

export type Due = { readonly due: true } | { readonly due: false; readonly why: string }

export function storiesAsked(): Query {
  return { pageTypeSlug: storyWritten.slug, keys: [SLUG, FOLLOWING, MASTER] }
}

export function chaptersAsked(story: string): Query {
  return {
    pageTypeSlug: storyChapterWritten.slug,
    where: { [STORY]: { is: `${storyWritten.slug}${PARTED}${story}` } },
    keys: [SLUG, STATUS, COMPLETED],
  }
}

function storyIn(row: Row): readonly Story[] {
  const slug = textIn(row[SLUG])
  if (slug === null) return []
  return [{ slug, following: row[FOLLOWING] === true, master: textIn(row[MASTER]) }]
}

function chapterIn(row: Row): readonly Chapter[] {
  const slug = textIn(row[SLUG])
  if (slug === null) return []
  return [{ slug, status: stepIn(row[STATUS]), completed: textIn(row[COMPLETED]) !== null }]
}

export function dueFor(story: Story, chapters: readonly Chapter[]): Due {
  if (!story.following) return { due: false, why: "not followed" }
  if (story.master === null) return { due: false, why: "names no coordinator agent" }
  const busy = chapters.find((one) => one.status !== null && one.status !== PLAYER)
  if (busy !== undefined) {
    return { due: false, why: `\`${busy.slug}\` is mid-step at ${String(busy.status)}` }
  }
  const unread = chapters.filter((one) => !one.completed).map((one) => one.slug)
  if (unread.length > 0) return { due: false, why: `unread: ${unread.join(", ")}` }
  return { due: true }
}

function madeSaid(made: ChapterMade): string {
  if (made.kind === "refused") return `refused\t${made.said}`
  if (made.kind === "unread") return `failed\t${made.why}`
  const faults = made.faults.map((one) => `\tfault\t${one}`)
  return [`started\t${made.slug}\t${made.at}`, ...faults].join("\n")
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
    const chapters = await ask(chaptersAsked(story.slug))
    if ("refused" in chapters) {
      said.push(`${story.slug}\tskipped\tchapters unread: ${chapters.refused}`)
      continue
    }
    const due = dueFor(story, chapters.rows.flatMap(chapterIn))
    if (!due.due) said.push(`${story.slug}\tskipped\t${due.why}`)
    else if (dry) said.push(`${story.slug}\twould write`)
    else said.push(`${story.slug}\t${madeSaid(await making(story.slug))}`)
  }
  return said
}
