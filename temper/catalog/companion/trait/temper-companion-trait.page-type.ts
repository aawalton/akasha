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
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/companion-metric", required: false, many: false },
    { pageProperty: "text-property/trait-effect-type", required: false, many: false },
    { pageProperty: "boolean-property/is-reduction", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's build-hash place is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
