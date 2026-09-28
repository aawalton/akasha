import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxSkill = {
  id: "01a0ea43-35ef-7576-9797-2bb3dece222a",
  type: "page-type/page-type",
  slug: "otherwhere-ix-skill",
  definition: "one skill a character in Otherwhere IX holds, at its level",
  pluralSlug: "system-skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-ix-skill-character",
    "number-property/otherwhere-ix-skill-level",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-ix-skill-character",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/otherwhere-ix-skill-level", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
