import type { OpenQuestion } from "akasha/alan/books/pages/all-about-alan/questions/properties/open-question.text-property.types.ts"
import type { QuestionTopic } from "akasha/alan/books/pages/all-about-alan/questions/properties/question-topic.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type AllAboutAlanQuestion = Page & {
  topic: QuestionTopic
  ask: OpenQuestion
}
