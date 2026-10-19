import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"

export type PlayerAnswers = Record<string, Record<string, EngineAnswer[]>>

export interface PlayerAnswerCatalogData {
  version: number
  apiVersion: number
  takenAt: number
  screenWidth: number
  screenHeight: number
  answers: PlayerAnswers
}

export const PLAYER_ANSWERS_VERSION = 2
