import type { TextProperty } from "@akasha/pages-system/text-property"

export type KeptBy = string

export const keptBy = {
  id: "01a0657d-b91d-7200-a73d-8b8122726299",
  pageTypeSlug: "text-property",
  slug: "kept-by",
  propertySlug: "kept-by",
  definition: "what keeps a record current",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record a command writes names the command.",
    },
    {
      invariantKind: "absence",
      statement: "A record naming no keeper of its own names no keeper here.",
    },
  ],
} as const satisfies TextProperty
