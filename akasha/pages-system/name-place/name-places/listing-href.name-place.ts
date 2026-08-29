import type { NamePlace } from "../name-place.page-type.ts"

export const listingHref = {
  id: "01a04fd4-3d76-728a-afd7-6ab3cfaa8e57",
  pageTypeSlug: "name-place",
  slug: "listing-href",
  definition: "the address the pages of one type are reached by from outside",
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An address is built of the page type's plural, named elsewhere, so the whole carries no format of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A listing closes with a slash, which parts it from the page of the same name.",
    },
  ],
} as const satisfies NamePlace
