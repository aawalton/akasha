import type { Page } from "../../pages/page.page-type.types.ts"
import type { QuestionAnswer } from "./properties/question-answer.text-property.ts"
import type { QuestionAsk } from "./properties/question-ask.text-property.ts"
import type { QuestionAskedBy } from "./properties/question-asked-by.relation-property.ts"
import type { QuestionAskedIn } from "./properties/question-asked-in.text-property.ts"
import type { QuestionClosedAt } from "./properties/question-closed-at.instant-property.ts"
import type { QuestionContext } from "./properties/question-context.file-property.ts"
import type { QuestionLinks } from "./properties/question-links.record-property.ts"
import type { QuestionOffered } from "./properties/question-offered.text-property.ts"
import type { QuestionStatus } from "./properties/question-status.select-property.ts"

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
