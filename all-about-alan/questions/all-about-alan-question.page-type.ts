import type { PageType } from "@akasha/pages/page-type"

export const allAboutAlanQuestion = {
  id: "01a077d9-ec56-7451-945a-1b2355aa31dc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "all-about-alan-question",
  definition: "one thing still open about a topic about Alan",
  pluralSlug: "all-about-alan-questions",
  extends: ["page-type/page"],
  mortal: true,
  parts: ["relation-property/question-topic", "text-property/open-question"],
  properties: [
    { pageProperty: "relation-property/question-topic", required: true, many: false },
    { pageProperty: "text-property/open-question", required: true, many: false },
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
  types: "ts",
} as const satisfies PageType
