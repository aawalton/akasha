import type { PageType } from "@akasha/pages/page-type"

export const storyDecision = {
  id: "01a06578-d638-7072-8faf-6245b8cda4ae",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-decision",
  definition: "one fork a reader settled, with what the settling changed",
  pluralSlug: "story-decisions",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "select-property/decision-type",
    "text-property/chosen",
    "text-property/decision-effect",
    "text-property/decision-options",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "number-property/chapter-number", required: false, many: false },
    { pageProperty: "select-property/decision-type", required: false, many: false },
    { pageProperty: "text-property/decision-options", required: false, many: false },
    { pageProperty: "text-property/chosen", required: false, many: false },
    { pageProperty: "text-property/decision-effect", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A decision has every option the decision was settled between as well as the option settled on.",
    },
    {
      invariantKind: "departure",
      statement: "An option not settled on stays so the fork can be read again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The effect a decision had is stated rather than worked out from the chapters after the decision.",
    },
    {
      invariantKind: "departure",
      statement: "The words a decision has are the story's rather than akasha's own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
