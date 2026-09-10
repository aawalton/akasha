import type { NamePlace } from "../name-place.page-type.types.ts"

export const pageHref = {
  id: "01a04fd4-3d75-7213-bde5-59110fc1ae06",
  pageTypeSlug: "name-place",
  type: "name-place",
  slug: "page-href",
  definition: "the address a page is reached by from outside",
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address is built of the page type's slug and the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "Each slug is named elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "The page's part has a tail taken from its id.",
    },
    {
      invariantKind: "departure",
      statement: "The tail parts two pages of one slug without either page being renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A part with a tail is no slug.",
    },
  ],
} as const satisfies NamePlace
