import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import type { CaptureDescriptor } from "akasha/temper/modules/descriptor/descriptor.module.code.ts"

export type PlayerAnswers = Record<string, Record<string, EngineAnswer[]>>

export interface PlayerAnswerPayload {
  apiVersion?: number
  takenAt?: number
  screenWidth?: number
  screenHeight?: number
  answers?: PlayerAnswers
}

export const PLAYER_ANSWERS_VERSION = 2

const DEFAULTS: PlayerAnswerPayload = {}

export const PLAYER_ANSWER_CAPTURE_DESCRIPTOR: CaptureDescriptor<PlayerAnswerPayload> = {
  addonName: "TemperCatalog",
  savedVariablesName: "TemperPlayerAnswers_SavedVariables",
  version: PLAYER_ANSWERS_VERSION,
  defaults: DEFAULTS,
}
