import type {
  ChapterProsePastTurns,
  ChapterProseTitles,
} from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ClientBeat } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"

export type PanelRun = {
  readonly turns: readonly ClientStoryTurn[]
  readonly beats: readonly ClientBeat[] | null | undefined
  readonly hrefById: ReadonlyMap<string, string>
  readonly earlier: number
  readonly titles: ChapterProseTitles | undefined
  readonly pastTurns: ChapterProsePastTurns | undefined
  readonly gameExternalId: string | undefined
  readonly submitPlayerAction: SubmitPlayerAction | undefined
}

export type PanelDrawing = {
  readonly envelope: SessionEnvelope
  readonly run: PanelRun
}
