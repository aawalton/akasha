import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXSkill = {
  id: "01a0ea7c-4060-75df-b0ed-90f543ecfc55",
  type: "page-type/page-type",
  slug: "otherwhere-x-skill",
  definition: "one skill a character in Otherwhere X holds, at its level and rarity",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-x-skill-character",
    "relation-property/otherwhere-x-skill-skill",
    "number-property/otherwhere-x-skill-level",
    "relation-property/otherwhere-x-skill-rarity",
  ],
  properties: [
    { pageProperty: "relation-property/otherwhere-x-skill-character", required: true, many: false },
    { pageProperty: "relation-property/otherwhere-x-skill-skill", required: true, many: false },
    { pageProperty: "number-property/otherwhere-x-skill-level", required: true, many: false },
    { pageProperty: "relation-property/otherwhere-x-skill-rarity", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
