import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionTrait = {
  id: "01a05fce-1854-7c89-a767-43b54ae4cefa",
  type: "page-type/page-type",
  slug: "temper-companion-trait",
  definition: "a property worked into a piece of companion equipment",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "page-type/temper-companion-trait-grade",
    "boolean-property/is-reduction",
    "relation-property/companion-metric",
    "text-property/trait-effect-type",
    "number-property/hash-place",
    "number-property/eso-weapon-trait-type",
    "number-property/eso-armor-trait-type",
    "number-property/eso-jewelry-trait-type",
    "number-property/ttc-trait-id",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/companion-metric", required: false, many: false },
    { pageProperty: "text-property/trait-effect-type", required: false, many: false },
    { pageProperty: "boolean-property/is-reduction", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/eso-weapon-trait-type", required: false, many: false },
    { pageProperty: "number-property/eso-armor-trait-type", required: false, many: false },
    { pageProperty: "number-property/eso-jewelry-trait-type", required: false, many: false },
    { pageProperty: "number-property/ttc-trait-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's build-hash place is the index a build hash has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
