import type { StandardAgentEnglishProperty } from "../standard-agent-english/properties/standard-agent-english-property.page-type.types.ts"

export type Definition = string

export const definition = {
  id: "01a049b9-856c-70ca-bfd8-31cb76ead837",
  pageTypeSlug: "standard-agent-english-property",
  type: "standard-agent-english-property",
  slug: "definition",
  propertySlug: "definition",
  definition: "the sentence naming what a page's subject is",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A definition has no clause saying the thing's purpose.",
    },
    {
      invariantKind: "absence",
      statement: "A definition has no clause saying why the thing is worth having.",
    },
    {
      invariantKind: "absence",
      statement: "A definition has no clause saying where the thing sits.",
    },
    {
      invariantKind: "departure",
      statement: "A definition names one concern.",
    },
    {
      invariantKind: "departure",
      statement: "A second concern needed to cover an area makes that area more than one domain.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fact true of every sibling belongs on the parent's line rather than on each sibling's own line.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain's concern stays on its own line even where every sibling is about the same thing.",
    },
  ],
} as const satisfies StandardAgentEnglishProperty
