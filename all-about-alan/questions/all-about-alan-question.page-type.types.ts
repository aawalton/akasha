import type { Page } from "../../pages/page.page-type.ts"
import type { OpenQuestion } from "./properties/open-question.text-property.ts"
import type { QuestionTopic } from "./properties/question-topic.relation-property.ts"

export type AllAboutAlanQuestion = Page & {
  topic: QuestionTopic
  ask: OpenQuestion
}
