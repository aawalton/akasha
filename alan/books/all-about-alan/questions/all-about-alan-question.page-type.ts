import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { OpenQuestion } from "./properties/open-question.text-property.ts"
import type { QuestionTopic } from "./properties/question-topic.relation-property.ts"

export type AllAboutAlanQuestion = Page & {
  topic: QuestionTopic
  ask: OpenQuestion
}

export const allAboutAlanQuestion = {
  id: "01a077d9-ec56-7451-945a-1b2355aa31dc",
  pageTypeSlug: "page-type",
  slug: "all-about-alan-question",
  definition: "one thing still open about a topic about Alan",
  pluralSlug: "all-about-alan-questions",
  extends: ["page-type/page"],
  mortal: true,
  partSlugs: ["relation-property/question-topic", "text-property/open-question"],
  properties: [
    { pagePropertySlug: "relation-property/question-topic", required: true, many: false },
    { pagePropertySlug: "text-property/open-question", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question asks one open thing.",
    },
    {
      invariantKind: "departure",
      statement: "A question sits under exactly one topic.",
    },
    {
      invariantKind: "departure",
      statement: "A question goes once the ask is settled.",
    },
    {
      invariantKind: "departure",
      statement: "A topic lists no question open on that topic.",
    },
  ],
} as const satisfies PageType
