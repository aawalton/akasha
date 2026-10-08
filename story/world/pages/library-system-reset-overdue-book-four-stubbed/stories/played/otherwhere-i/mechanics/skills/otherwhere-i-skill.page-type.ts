import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereISkill = {
  id: "01a0e7f8-cd1e-7c5f-99ea-3fcf5cc7205a",
  type: "page-type/page-type",
  slug: "otherwhere-i-skill",
  definition: "one character's learned power in Otherwhere",
  pluralSlug: "skills",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-the-library-skill-character",
    "relation-property/otherwhere-the-library-skill-skill",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-the-library-skill-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/otherwhere-the-library-skill-skill",
      required: true,
      many: false,
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-28T12:23:57.470Z",
  updatedAt: "2026-09-28T22:57:02.000Z",
} as const satisfies PageType
