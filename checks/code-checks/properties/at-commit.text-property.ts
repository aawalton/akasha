import type { TextProperty } from "@akasha/pages-system/text-property"

export type AtCommit = string

export const atCommit = {
  id: "01a06e1e-6a56-7cbe-8bd6-f948c5fa7646",
  pageTypeSlug: "text-property",
  slug: "at-commit",
  propertySlug: "at-commit",
  definition: "the commit a check's code was at when the figures beside this were taken",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commit named is the last one that touched the code measured.",
    },
    {
      invariantKind: "departure",
      statement: "A commit later than that one would read as figures fresher than they are.",
    },
  ],
} as const satisfies TextProperty
