import type { TextProperty } from "@akasha/pages-system/text-property"

export type Definition = string

export const definition = {
  id: "01a049b9-856c-70ca-bfd8-31cb76ead837",
  pageTypeSlug: "text-property",
  slug: "definition",
  propertySlug: "definition",
  definition: "the sentence naming what a page's subject is",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A definition holds no clause saying what the thing is for.",
    },
    {
      invariantKind: "absence",
      statement: "A definition holds no clause saying why the thing is worth having.",
    },
    {
      invariantKind: "absence",
      statement: "A definition holds no clause saying where the thing sits.",
    },
    {
      invariantKind: "departure",
      statement: "A definition names one concern.",
    },
    {
      invariantKind: "departure",
      statement: "Where a second concern is needed to cover the area it is more than one domain.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fact true of every sibling belongs on the parent's line rather than on each sibling's own line.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a domain is about stays on its own line even where every sibling is about the same thing.",
    },
  ],
} as const satisfies TextProperty
