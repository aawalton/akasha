import type {
  ChapterProsePastTurns,
  ChapterProseTitles,
} from "@akasha/story-engine-core/game-schema"
import type { ClientStoryTurn } from "../client-story-session/client-story-session.module.code.ts"

export interface ProseRow {
  readonly turn: ClientStoryTurn
  readonly sessionDivider: number | null
  readonly newest: boolean
  readonly showTitle: boolean
  readonly muted: boolean
}

export interface ProseRenderOptions {
  readonly titles?: ChapterProseTitles
  readonly pastTurns?: ChapterProsePastTurns
}

export function projectProseRows(
  turns: readonly ClientStoryTurn[],
  options: ProseRenderOptions = {}
): readonly ProseRow[] {
  const lastIndex = turns.length - 1
  const showTitle = options.titles !== "hidden"
  const muteAll = options.pastTurns === "muted"
  return turns.map((turn, i) => {
    const prev = i > 0 ? turns[i - 1] : undefined
    const session = turn.sessionNumber
    const sessionDivider =
      session !== undefined && prev?.sessionNumber !== undefined && session !== prev.sessionNumber
        ? session
        : null
    const newest = i === lastIndex
    return {
      turn,
      sessionDivider,
      newest,
      showTitle,
      muted: muteAll && !newest && turn.fullyRead === true,
    }
  })
}
