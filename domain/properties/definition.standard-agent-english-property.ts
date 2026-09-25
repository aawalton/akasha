import type { StandardAgentEnglishProperty } from "akasha/domain/plain-language/standard-agent-english/property/standard-agent-english-property.page-type.types.ts"

export const definition = {
  id: "01a049b9-856c-70ca-bfd8-31cb76ead837",
  type: "page-type/standard-agent-english-property",
  slug: "definition",
  propertySlug: "definition",
  definition: "the sentence naming what a page's subject is",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A definition has no clause saying the thing's purpose.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A definition has no clause saying why the thing is worth having.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A definition has no clause saying where the thing sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition names one concern.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second concern needed to cover an area makes that area more than one domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact true of every sibling belongs on the parent's line rather than on each sibling's own line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A domain's concern stays on its own line even where every sibling is about the same thing.",
    },
  ],
  types: "ts",
  startSymbol: "phrase-kind/domain-definition",
} as const satisfies StandardAgentEnglishProperty
