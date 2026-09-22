import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionWeaponRole = {
  id: "01a05fcd-aed1-7e12-be73-72bd7b05ba15",
  type: "page-type/page-type",
  slug: "temper-companion-weapon-role",
  definition: "a way a companion's weapons are paired",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "text-property/valid-main-hand-weapon-types",
    "text-property/valid-off-hand-weapon-types",
    "relation-property/weapon-skill-line",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    {
      pageProperty: "text-property/valid-main-hand-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "text-property/valid-off-hand-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "relation-property/weapon-skill-line", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
