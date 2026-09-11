import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { QuestionAnswer } from "akasha/personas/questions/properties/question-answer.text-property.types.ts"
import type { QuestionAsk } from "akasha/personas/questions/properties/question-ask.text-property.types.ts"
import type { QuestionAskedBy } from "akasha/personas/questions/properties/question-asked-by.relation-property.types.ts"
import type { QuestionAskedIn } from "akasha/personas/questions/properties/question-asked-in.text-property.types.ts"
import type { QuestionClosedAt } from "akasha/personas/questions/properties/question-closed-at.instant-property.types.ts"
import type { QuestionContext } from "akasha/personas/questions/properties/question-context.file-property.ts"
import type { QuestionLinks } from "akasha/personas/questions/properties/question-links.record-property.types.ts"
import type { QuestionOffered } from "akasha/personas/questions/properties/question-offered.text-property.types.ts"
import type { QuestionStatus } from "akasha/personas/questions/properties/question-status.select-property.types.ts"

export type Question = Page & {
  ask: QuestionAsk
  askedBy: QuestionAskedBy
  askedIn: QuestionAskedIn
  status: QuestionStatus
  offered?: QuestionOffered
  answer?: QuestionAnswer
  closedAt?: QuestionClosedAt
  context?: QuestionContext
  links?: QuestionLinks
}
