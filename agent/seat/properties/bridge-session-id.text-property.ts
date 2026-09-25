import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bridgeSessionId = {
  id: "01a0d8fe-10c8-71db-b3c0-b90996eb6a90",
  type: "page-type/text-property",
  slug: "bridge-session-id",
  propertySlug: "bridge-session-id",
  definition: "the id a person uses to chat with a seat through a website",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The session is stated as claude.ai names it in a link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose agent is reached through no session states none.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
