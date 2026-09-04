import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastSeenAt = string

export const errorLastSeenAt = {
  id: "01a05f3f-e3e0-7d03-874b-3c6c7f2183d1",
  pageTypeSlug: "instant-property",
  slug: "error-last-seen-at",
  propertySlug: "last-seen-at",
  definition: "when an error was most recently met",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The moment an error was last met moves whenever the error is met again.",
    },
    {
      invariantKind: "departure",
      statement: "The moment an error was last met is kept outside the commit.",
    },
    {
      invariantKind: "gap",
      statement: "An error naming no such moment was last met at an unknown moment.",
    },
  ],
} as const satisfies InstantProperty
