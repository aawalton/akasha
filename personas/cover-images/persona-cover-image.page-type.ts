import type { PageType } from "@akasha/pages/page-type"

export const personaCoverImage = {
  id: "01a0655b-4a9b-700b-a9cc-a60c8e139737",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "persona-cover-image",
  definition: "the picture a persona is shown by at a rung of closeness",
  pluralSlug: "persona-cover-images",
  extends: ["page-type/persona-image"],
  parts: [],
  properties: [{ pageProperty: "number-property/relationship-level", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cover is matched by the persona and the rung together.",
    },
    {
      invariantKind: "departure",
      statement: "A cover naming no path is kept in the object store under its own identity.",
    },
  ],
  types: "ts",
} as const satisfies PageType
