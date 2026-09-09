import type { TextProperty } from "@akasha/pages/text-property"

export type KeptBy = string

export const keptBy = {
  id: "01a0657d-b91d-7200-a73d-8b8122726299",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "kept-by",
  propertySlug: "kept-by",
  definition: "what keeps a record current",
  maxLength: 100,
  nameFormat: null,
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
