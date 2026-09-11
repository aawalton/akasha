import type { questionStatus } from "akasha/personas/questions/properties/question-status.select-property.ts"

export type QuestionStatus = (typeof questionStatus.values)[number]
