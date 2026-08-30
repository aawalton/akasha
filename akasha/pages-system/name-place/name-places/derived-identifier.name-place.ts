import type { NamePlace } from "../name-place.page-type.ts"

export const derivedIdentifier = {
  id: "01a04fc9-2ad9-76c1-9144-cbcca3d44196",
  pageTypeSlug: "name-place",
  slug: "derived-identifier",
  definition: "the name a value carries inside the function working it out",
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name inside a function belongs to one call rather than to the file.",
    },
  ],
} as const satisfies NamePlace
