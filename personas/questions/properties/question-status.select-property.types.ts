import type { questionStatus } from "./question-status.select-property.ts"

export type QuestionStatus = (typeof questionStatus.values)[number]
