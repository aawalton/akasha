import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionWeaponType = {
  id: "01a05fcd-aed1-71b0-8b8c-2b74e9a2d662",
  type: "page-type/page-type",
  slug: "temper-companion-weapon-type",
  definition: "a kind of weapon a companion wields",
  extends: ["page-type/temper-companion-thing"],
  parts: ["boolean-property/is-off-hand-only"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/is-off-hand-only", required: true, many: false },
    { pageProperty: "boolean-property/is-two-handed", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon type's build-hash place is the index a build hash has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
