import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const review = {
  id: "01a0deb3-08b8-769d-92a9-df95450e043a",
  type: "page-type/page-type",
  slug: "review",
  definition: "the images stating no grade, shown one at a time to be graded",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A review covers every image stating no grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review naming a persona covers only the images of that persona.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review is never done, and a review whose images all state a grade is empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image graded anywhere leaves every review covering that image.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No review deletes an image.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["relation-property/review-persona"],
  properties: [{ pageProperty: "relation-property/review-persona", required: false, many: false }],
} as const satisfies PageType
