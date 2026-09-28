import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiArt = {
  id: "01a0ea48-9302-7d58-9a10-d6e9e750c5d8",
  type: "page-type/page-type",
  slug: "otherwhere-viii-art",
  definition: "one character's learned work of the Art in Otherwhere VIII",
  pluralSlug: "arts",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-viii-art-character",
    "relation-property/otherwhere-viii-art-skill",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-viii-art-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/otherwhere-viii-art-skill",
      required: true,
      many: false,
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
