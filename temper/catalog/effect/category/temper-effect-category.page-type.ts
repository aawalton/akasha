import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEffectCategory = {
  id: "01a0df69-212e-7ce1-bdda-e135f0650bde",
  type: "page-type/page-type",
  slug: "temper-effect-category",
  definition: "a kind of thing a skill's effect does, as a skill's effects are grouped on screen",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's effects are listed in their categories' display order.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
