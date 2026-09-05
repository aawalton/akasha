import type { PageAddressKind } from "../page-address-kind.page-type.ts"

export const inPartOf = {
  id: "01a0731d-f940-7d5d-ade6-7b2d21f69025",
  pageTypeSlug: "page-address-kind",
  slug: "in-part-of",
  definition: "an address naming a page by a value unique among the pages one page is made of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index answers this kind under the scope of the parent named.",
    },
    {
      invariantKind: "departure",
      statement: "This kind answers the reach `part-of`.",
    },
    {
      invariantKind: "departure",
      statement: "The parent is named by an address rather than by a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page part of more than one page has an address under each of them.",
    },
    {
      invariantKind: "absence",
      statement: "No address of this kind is the one address for the page it names.",
    },
  ],
} as const satisfies PageAddressKind
