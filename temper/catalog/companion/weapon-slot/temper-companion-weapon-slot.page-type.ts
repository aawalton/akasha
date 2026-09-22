import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionWeaponSlot = {
  id: "01a05fcd-41a9-7114-8636-28bd59dc4a76",
  type: "page-type/page-type",
  slug: "temper-companion-weapon-slot",
  definition: "a hand holding a companion's weapon",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
