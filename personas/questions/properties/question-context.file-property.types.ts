import type { questionContext } from "akasha/personas/questions/properties/question-context.file-property.ts"

export type QuestionContext = (typeof questionContext.extensions)[number]
