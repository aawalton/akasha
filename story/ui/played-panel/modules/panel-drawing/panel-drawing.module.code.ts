import type { ChapterProsePastTurns } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ClientBeat } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import type { BeatOverlay } from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import type { OutcomeCard } from "akasha/story/world/stories/played/modules/played-outcomes/played-outcomes.module.code.tsx"

export type PlayedTurnCover = {
  readonly id: string
  readonly number: number
  readonly cover: string
  readonly of?: string | undefined
  readonly after?: string | undefined
  readonly beat?: number | undefined
}

export type PanelAppointment = {
  readonly id: string
  readonly when: string
  readonly title: string
}

export type PanelRun = {
  readonly clock: string | null
  readonly upcoming: readonly PanelAppointment[]
  readonly turns: readonly ClientStoryTurn[]
  readonly turnsPageTypeSlug?: string | undefined
  readonly turnCovers: readonly PlayedTurnCover[]
  readonly coversAreScenes?: boolean | undefined
  readonly coversFollowBeats?: boolean | undefined
  readonly beat?: number | undefined
  readonly player: string
  readonly appeared?: readonly string[] | undefined
  readonly overlay?: BeatOverlay | undefined
  readonly storyAddress: string
  readonly intent: string
  readonly beats: readonly ClientBeat[] | null | undefined
  readonly earlier: number
  readonly pastTurns: ChapterProsePastTurns | undefined
  readonly gameExternalId: string | undefined
  readonly submitPlayerAction: SubmitPlayerAction | undefined
  readonly outcomeCards?: ReadonlyMap<string, readonly OutcomeCard[]> | undefined
}

export type PanelDrawing = {
  readonly envelope: SessionEnvelope
  readonly run: PanelRun
}
