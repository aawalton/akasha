import type { NamePlace } from "../name-place.page-type.ts"

export const constantIdentifier = {
  id: "01a04fc9-2ad8-7f99-9d3a-bbae29319b17",
  pageTypeSlug: "name-place",
  slug: "constant-identifier",
  definition: "the name standing for a value written where it stands",
  nameFormatSlug: "name-format/upper-snake-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A value written where it stands is fixed for the life of the file, and its case says so at every use.",
    },
    {
      invariantKind: "departure",
      statement:
        "A regular expression, a set of fixed words, and a plain string are alike written where they stand.",
    },
  ],
} as const satisfies NamePlace
