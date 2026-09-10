import type { PageType } from "@akasha/pages/page-type"

export const personaAnchorImage = {
  id: "01a0655b-4a9b-700a-b7af-04be2a9c0df4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-anchor-image",
  definition: "the picture every other picture of a persona is drawn to match",
  pluralSlug: "persona-anchor-images",
  extends: ["page-type/persona-image"],
  parts: ["text-property/grade"],
  properties: [{ pageProperty: "text-property/grade", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor is matched by the persona alone.",
    },
    {
      invariantKind: "departure",
      statement: "A persona has one anchor.",
    },
  ],
  types: "ts",
} as const satisfies PageType
