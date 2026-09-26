import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionRotationTiming = {
  id: "01a0dee9-195c-7c3e-b739-2a1dec512911",
  type: "page-type/page-type",
  slug: "temper-companion-rotation-timing",
  definition: "a timing the game holds a companion's rotation to",
  extends: ["page-type/temper-companion-thing"],
  parts: ["number-property/timing-value"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/timing-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rotation timing is a fact of the game rather than a choice of the simulation.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
