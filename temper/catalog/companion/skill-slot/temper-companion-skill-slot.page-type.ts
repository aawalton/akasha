import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionSkillSlot = {
  id: "01a05fcd-41a9-75e4-9a61-ca49c001eb2d",
  type: "page-type/page-type",
  slug: "temper-companion-skill-slot",
  definition: "a place on a companion's bar an ability sits",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
