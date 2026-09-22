import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const closenessLevel = {
  id: "01a0540e-5111-7164-acb3-f776b18d8b45",
  type: "page-type/page-type",
  slug: "closeness-level",
  definition: "a rung of how close a persona is drawn, from public to unveiled",
  extends: ["page-type/domain"],
  parts: [
    "closeness-level/level-1",
    "closeness-level/level-2",
    "closeness-level/level-3",
    "closeness-level/level-4",
    "closeness-level/level-5",
    "closeness-level/level-6",
    "number-property/level",
    "number-property/points-to-here",
    "number-property/points-to-next",
    "relation-property/relationship-level",
    "text-property/pose",
    "text-property/stage",
    "text-property/wardrobe",
  ],
  properties: [
    { pageProperty: "number-property/level", required: true, many: false },
    { pageProperty: "number-property/points-to-here", required: true, many: false },
    { pageProperty: "number-property/points-to-next", required: true, many: false },
    { pageProperty: "text-property/stage", required: true, many: false },
    { pageProperty: "text-property/wardrobe", required: true, many: false },
    { pageProperty: "text-property/pose", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is reached by points earned rather than chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points a rung takes are stated here rather than worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona below the first rung is at level 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Level 0 is no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs run from level 1 upward with no level missing between.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
