import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponTrait = {
  id: "01a05fd1-d442-7175-b5e4-f7ef9e21a36c",
  type: "page-type/page-type",
  slug: "temper-weapon-trait",
  definition: "a property worked into a weapon",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
