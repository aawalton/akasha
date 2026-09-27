import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponTrait = {
  id: "01a05fd1-d442-7175-b5e4-f7ef9e21a36c",
  type: "page-type/page-type",
  slug: "temper-weapon-trait",
  definition: "a property worked into a weapon",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/weapon-trait"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait a build may pick is available, and a trait kept only for sale is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's effects state its legendary worth, and its grades state each quality.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
