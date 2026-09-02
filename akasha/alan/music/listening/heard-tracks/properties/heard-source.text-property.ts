import type { TextProperty } from "@akasha/pages-system/text-property"

export type HeardSource = string

export const heardSource = {
  id: "01a06240-340f-700e-a486-9e430bc408b2",
  pageTypeSlug: "text-property",
  slug: "heard-source",
  propertySlug: "heard-source",
  definition: "where a heard track was learned from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A heard source is `observed` or `seed-top-tracks` or `seed-rated` or `seed-prior-window`.",
    },
    {
      invariantKind: "stopgap",
      statement: "The sources a track is heard from are no pages.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a heard source.",
    },
  ],
} as const satisfies TextProperty
