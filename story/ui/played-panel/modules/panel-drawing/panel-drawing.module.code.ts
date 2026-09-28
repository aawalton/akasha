import type { ChapterProsePastTurns } from "akasha/story/engine/core/modules/story-display/story-display.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import type { ClientBeat } from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"

export type PlayedTurnCover = {
  readonly id: string
  readonly number: number
  readonly cover: string
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
  readonly player: string
  readonly beats: readonly ClientBeat[] | null | undefined
  readonly earlier: number
  readonly pastTurns: ChapterProsePastTurns | undefined
  readonly gameExternalId: string | undefined
  readonly submitPlayerAction: SubmitPlayerAction | undefined
}

export type PanelDrawing = {
  readonly envelope: SessionEnvelope
  readonly run: PanelRun
}
