import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type FirstSeenAt = string

export const errorFirstSeenAt = {
  id: "01a05f3f-e3e0-79ae-a33f-a08a9966c72b",
  pageTypeSlug: "instant-property",
  slug: "error-first-seen-at",
  propertySlug: "first-seen-at",
  definition: "when an error was met for the first time",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The moment an error was first met is the moment the error's page was filed.",
    },
    {
      invariantKind: "departure",
      statement: "The moment an error was first met never moves.",
    },
    {
      invariantKind: "departure",
      statement: "The moment an error was first met is written into the commit.",
    },
  ],
} as const satisfies InstantProperty
