import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEsoCompanion = {
  id: "01a05fcf-2466-7bcb-9ec1-3f0fd467d879",
  type: "page-type/page-type",
  slug: "temper-eso-companion",
  definition: "a companion The Elder Scrolls Online itself names",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "number-property/eso-companion-id",
    "page-property-entry/passive-effects",
    "relation-property/alliance",
    "text-property/class-passive-id",
    "text-property/subtitle",
    "module/companion-address",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/subtitle", required: false, many: false },
    { pageProperty: "relation-property/alliance", required: true, many: false },
    { pageProperty: "number-property/eso-companion-id", required: true, many: false },
    { pageProperty: "text-property/class-passive-id", required: false, many: false },
    { pageProperty: "page-property-entry/passive-effects", required: false, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A companion's build-hash place is the index a build hash has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
