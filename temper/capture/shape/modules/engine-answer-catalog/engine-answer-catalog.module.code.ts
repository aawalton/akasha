export type EngineAnswer = number | string | boolean

export interface EngineAnswerCatalogData {
  readonly apiVersion: number
  readonly answers: Readonly<Record<string, readonly EngineAnswer[]>>
  readonly answersGiven: Readonly<Record<string, Readonly<Record<string, readonly EngineAnswer[]>>>>
}
