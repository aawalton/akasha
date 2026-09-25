import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const agentMessageBody = {
  id: "01a06818-107b-7003-af7a-fe09cd6ace6c",
  type: "page-type/text-property",
  slug: "agent-message-body",
  propertySlug: "body",
  definition: "the words of a message",
  maxLength: 20000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The words reach the recipient marked as data rather than as instruction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words are sent as written rather than filled in as the message sends.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
