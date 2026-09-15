import type { OpenQuestion } from "akasha/alan/book/pages/all-about-alan/question/properties/open-question.text-property.types.ts"
import type { QuestionTopic } from "akasha/alan/book/pages/all-about-alan/question/properties/question-topic.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type AllAboutAlanQuestion = Page & {
  topic: QuestionTopic
  ask: OpenQuestion
}
