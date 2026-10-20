import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponRule = {
  id: "01a15adb-a0c7-7ea7-9d7a-9cb3009b7064",
  type: "page-type/page-type",
  slug: "temper-weapon-rule",
  definition: "a rule the game holds every weapon to",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/level-one-power",
    "number-property/top-power",
    "number-property/two-handed-melee-power",
  ],
  properties: [
    { pageProperty: "number-property/level-one-power", required: true, many: false },
    { pageProperty: "number-property/top-power", required: true, many: false },
    { pageProperty: "number-property/two-handed-melee-power", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-20T19:48:25.413Z",
  updatedAt: "2026-10-20T19:48:25.413Z",
} as const satisfies PageType
