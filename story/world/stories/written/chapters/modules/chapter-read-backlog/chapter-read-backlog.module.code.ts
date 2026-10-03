import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  objectIn,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import {
  type BacklogKept,
  backlogKept,
} from "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const PATCHES: readonly string[] = ["patchPage", "patchPages", "patchPageById"]

const ID = "id"

const STORY = "story"

const COMPLETED = "completedAt"

const OPENING = `${storyWritten.slug}/`

export type Asking = (query: Query) => Promise<Rows>

export type Keeping = (story: string) => Promise<BacklogKept>

function idWhere(where: unknown): string | null {
  if (!Array.isArray(where)) return null
  const held = where.map(objectIn).find((one) => one?.["key"] === ID)
  return held === undefined || held === null ? null : textIn(held["eq"])
}

export function chapterReadIn(body: unknown): string | null {
  const asked = objectIn(body)
  const args = objectIn(asked?.["args"])
  if (asked === null || args === null) return null
  if (!PATCHES.includes(String(asked["op"]))) return null
  if (args["pageTypeSlug"] !== storyChapterWritten.slug) return null
  if (textIn(objectIn(args["set"])?.[COMPLETED]) === null) return null
  return textIn(args[ID]) ?? idWhere(args["where"])
}

function failed(chapter: string, why: string): BacklogKept {
  return { said: `\`${chapter}\` was read, and ${why}`, failed: true, faults: [] }
}

async function storyKept(chapter: string, ask: Asking, keep: Keeping): Promise<BacklogKept> {
  const where = { [ID]: { is: chapter } }
  const rows = await ask({ pageTypeSlug: storyChapterWritten.slug, where, keys: [STORY] })
  if ("refused" in rows) return failed(chapter, `its story went unread: ${rows.refused}`)
  const story = textIn(rows.rows[0]?.[STORY])
  if (story === null || !story.startsWith(OPENING)) return failed(chapter, "it names no story")
  return await keep(story.slice(OPENING.length))
}

export async function chapterReadBacklog(
  chapter: string,
  ask: Asking = (query) => askingFor(query),
  keep: Keeping = (story) => backlogKept(story)
): Promise<BacklogKept> {
  try {
    return await storyKept(chapter, ask, keep)
  } catch (thrown) {
    return failed(chapter, `its story's backlog threw: ${saidBy(thrown)}`)
  }
}
