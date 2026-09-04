import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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
  offered?: readonly QuestionOffered[]
  answer?: QuestionAnswer
  closedAt?: QuestionClosedAt
  context?: QuestionContext
  links?: QuestionLinks
}

export const question = {
  id: "01a06823-89b2-7000-9bb7-f118049c3ba7",
  pageTypeSlug: "page-type",
  slug: "question",
  definition: "something a persona put to Alan that only Alan can settle",
  pluralSlug: "questions",
  extendsSlug: ["page-type/page"],
  partSlugs: [
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
    { pagePropertySlug: "question-ask", required: true, many: false },
    { pagePropertySlug: "question-asked-by", required: true, many: false },
    { pagePropertySlug: "question-asked-in", required: true, many: false },
    { pagePropertySlug: "question-status", required: true, many: false, default: "open" },
    { pagePropertySlug: "question-offered", required: false, many: true, max: 12 },
    { pagePropertySlug: "question-answer", required: false, many: false },
    { pagePropertySlug: "question-closed-at", required: false, many: false },
    { pagePropertySlug: "question-context", required: false, many: false },
    { pagePropertySlug: "question-links", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question is put to Alan and to nobody else.",
    },
    {
      invariantKind: "departure",
      statement: "A question names the persona who put it.",
    },
    {
      invariantKind: "departure",
      statement: "A question offering answers still takes an answer none of them spells.",
    },
    {
      invariantKind: "departure",
      statement: "A question stays once it is closed rather than going.",
    },
    {
      invariantKind: "departure",
      statement: "A question closes by being answered or by being let go.",
    },
    {
      invariantKind: "departure",
      statement:
        "What stood around a question when it was put stands beside the page rather than in it.",
    },
    {
      invariantKind: "gap",
      statement: "The context a question was put in is an id here rather than a relation to it.",
    },
  ],
} as const satisfies PageType
