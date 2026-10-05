import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { StoryDisplayModules } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { composeSessionEnvelope } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"

export const CHAPTER_PAGE_TYPE_SLUG = "story-chapter-read"

export const CHAPTER_STORY_KEY = "story"

export const CHAPTER_POSITION_KEY = "position"

const UNTITLED = "Untitled"

const CHANNEL_MODULES: StoryDisplayModules = {
  chapterProse: { pastTurns: "muted" },
}

function numberIn(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string" || value.trim() === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function titleIn(value: unknown): string {
  return typeof value === "string" && value.trim() !== "" ? value : UNTITLED
}

function byPosition(a: Page, b: Page): number {
  const left = numberIn(a.position) ?? Number.POSITIVE_INFINITY
  const right = numberIn(b.position) ?? Number.POSITIVE_INFINITY
  if (left !== right) return left < right ? -1 : 1
  const leftTitle = titleIn(a.title)
  const rightTitle = titleIn(b.title)
  if (leftTitle === rightTitle) return 0
  return leftTitle < rightTitle ? -1 : 1
}

export function chapterTurnsOf(rows: readonly Page[]): readonly ClientStoryTurn[] {
  return [...rows].sort(byPosition).map((row) => {
    const turnNumber = numberIn(row.position)
    return {
      id: row.id,
      title: titleIn(row.title),
      text: "",
      ...(turnNumber === undefined ? {} : { turnNumber }),
      fullyRead: row.completedAt != null,
    }
  })
}

export function chapterChannelEnvelope(
  title: string,
  turns: readonly ClientStoryTurn[]
): SessionEnvelope {
  return composeSessionEnvelope(title, CHANNEL_MODULES, {
    state: null,
    story: { chapters: [], current: turns },
  })
}
