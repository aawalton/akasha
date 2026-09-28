import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldSkill = {
  id: "01a06558-a991-78e4-a48c-b4e64323c76c",
  type: "page-type/page-type",
  slug: "world-skill",
  definition: "an ability a character works from the magic within them",
  pluralSlug: "skills",
  extends: ["page-type/world-mechanic"],
  parts: [
    "page-type/tower-skill",
    "page-type/otherwhere-i-skill",
    "page-type/otherwhere-v-utility-skill",
    "page-type/otherwhere-vii-technique",
    "page-type/otherwhere-ix-skill",
    "number-property/skill-mana-cost",
    "number-property/skill-duration-minutes",
  ],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  properties: [
    { pageProperty: "number-property/skill-mana-cost", required: false, many: false },
    { pageProperty: "number-property/skill-duration-minutes", required: false, many: false },
  ],
} as const satisfies PageType
