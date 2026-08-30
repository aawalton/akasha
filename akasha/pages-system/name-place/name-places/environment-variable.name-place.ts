import type { NamePlace } from "../name-place.page-type.ts"

export const environmentVariable = {
  id: "01a04fed-2fc0-7d40-b4e0-e630cdde2957",
  pageTypeSlug: "name-place",
  slug: "environment-variable",
  definition: "the name a value handed to a process from outside is read under",
  nameFormatSlug: "name-format/upper-snake-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value handed in from outside stands fixed for the whole of a run.",
    },
    {
      invariantKind: "departure",
      statement: "A name akasha reads opens with the name of what set it.",
    },
  ],
} as const satisfies NamePlace
