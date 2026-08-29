import type { NamePlace } from "../name-place.page-type.ts"

export const derivedIdentifier = {
  id: "01a04fc9-2ad9-76c1-9144-cbcca3d44196",
  pageTypeSlug: "name-place",
  slug: "derived-identifier",
  definition: "the name standing for a value worked out as the file loads",
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A value worked out is not fixed where it is written, so it is named as what it is rather than as a constant.",
    },
  ],
} as const satisfies NamePlace
