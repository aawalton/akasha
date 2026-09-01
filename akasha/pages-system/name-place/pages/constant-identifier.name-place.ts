import type { NamePlace } from "../name-place.page-type.ts"

export const constantIdentifier = {
  id: "01a04fc9-2ad8-7f99-9d3a-bbae29319b17",
  pageTypeSlug: "name-place",
  slug: "constant-identifier",
  definition: "the name data carries at the top of a file, outside any function",
  nameFormatSlug: "name-format/upper-snake-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Data is data whether the data is written out or built as the file loads.",
    },
    {
      invariantKind: "departure",
      statement: "A regular expression is data.",
    },
    {
      invariantKind: "departure",
      statement: "A set of fixed words is data.",
    },
    {
      invariantKind: "departure",
      statement: "A plain string is data.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name bound to a function or to a thing the file acts on is not data wherever it stands.",
    },
  ],
} as const satisfies NamePlace
