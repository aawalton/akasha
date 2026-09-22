import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const heardMusic = {
  id: "01a06240-340f-700a-be22-823bb6c905f7",
  type: "page-type/page-type",
  slug: "heard-music",
  definition: "every track a person has heard",
  extends: ["page-type/page"],
  parts: ["page-property-entry/tracks", "page-type/heard-source"],
  properties: [
    { pageProperty: "relation-property/person", required: true, many: false },
    { pageProperty: "page-property-entry/tracks", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One person has one heard music page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track entered into a heard music page is never taken out.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
