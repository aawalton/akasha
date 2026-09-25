import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const agentMessageFrom = {
  id: "01a06818-107b-7001-9459-e63f4dbdd555",
  type: "page-type/text-property",
  slug: "agent-message-from",
  propertySlug: "from",
  definition: "who a message says sent it",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender is a seat or a persona or a person or a service that has no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person sends under the slug of that person's page.",
    },

    {
      decisionKind: "decision-kind/constraint",
      statement: "A supervisor and a service each send under a name that is no page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
