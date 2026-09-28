import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVUtilitySkill = {
  id: "01a0ea01-5719-755d-94fd-72e8bfea55a6",
  type: "page-type/page-type",
  slug: "otherwhere-v-utility-skill",
  definition: "one utility skill a character in Otherwhere V holds, at its rank",
  pluralSlug: "utility-skills",
  extends: ["page-type/world-skill"],
  parts: ["relation-property/otherwhere-v-utility-skill-character"],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-v-utility-skill-character",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/otherwhere-v-rank", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
