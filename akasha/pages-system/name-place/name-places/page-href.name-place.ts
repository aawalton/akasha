import type { NamePlace } from "../name-place.page-type.ts"

export const pageHref = {
  id: "01a04fd4-3d75-7213-bde5-59110fc1ae06",
  pageTypeSlug: "name-place",
  slug: "page-href",
  definition: "the address a page is reached by from outside",
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address is built of the page type's slug and the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "Each is named elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "The page's part carries a tail taken from its id.",
    },
    {
      invariantKind: "departure",
      statement: "The tail parts two pages of one slug without either being renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A tail makes the part no longer a slug.",
    },
  ],
} as const satisfies NamePlace
