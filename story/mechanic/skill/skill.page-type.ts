import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const skill = {
  id: "01a0de16-90e0-7a5d-a682-a41555b0e324",
  type: "page-type/page-type",
  slug: "skill",
  definition: "one character's learned ability",
  pluralSlug: "skills",
  extends: ["page-type/mechanic"],
  parts: ["relation-property/skill-character"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/skill-character", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
