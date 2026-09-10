import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
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

export const question = {
  id: "01a06823-89b2-7000-9bb7-f118049c3ba7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "question",
  definition: "something a persona put to Alan that only Alan can settle",
  pluralSlug: "questions",
  extends: ["page-type/page"],
  parts: [
    "file-property/question-context",
    "instant-property/question-closed-at",
    "record-property/question-links",
    "relation-property/question-asked-by",
    "select-property/link-platform",
    "select-property/question-status",
    "text-property/link-label",
    "text-property/link-target",
    "text-property/question-answer",
    "text-property/question-ask",
    "text-property/question-asked-in",
    "text-property/question-offered",
  ],
  properties: [
    { pageProperty: "text-property/question-ask", required: true, many: false },
    { pageProperty: "relation-property/question-asked-by", required: true, many: false },
    { pageProperty: "text-property/question-asked-in", required: true, many: false },
    {
      pageProperty: "select-property/question-status",
      required: true,
      many: false,
      default: "open",
    },
    {
      pageProperty: "text-property/question-offered",
      required: false,
      many: true,
      maxCount: 12,
    },
    { pageProperty: "text-property/question-answer", required: false, many: false },
    { pageProperty: "instant-property/question-closed-at", required: false, many: false },
    { pageProperty: "file-property/question-context", required: false, many: false },
    {
      pageProperty: "record-property/question-links",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question is put to Alan and to nobody else.",
    },
    {
      invariantKind: "departure",
      statement: "A question names the persona who put that question.",
    },
    {
      invariantKind: "departure",
      statement: "A question offering answers still takes an answer those answers do not spell.",
    },
    {
      invariantKind: "departure",
      statement: "A question stays once that question is closed rather than going.",
    },
    {
      invariantKind: "departure",
      statement: "A question closes by being answered or by being let go.",
    },
    {
      invariantKind: "departure",
      statement: "The context a question was put in sits beside the page rather than in that page.",
    },
    {
      invariantKind: "gap",
      statement:
        "The context a question was put in is an id here rather than a relation to that context.",
    },
  ],
} as const satisfies PageType
