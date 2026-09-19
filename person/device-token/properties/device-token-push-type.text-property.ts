import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deviceTokenPushType = {
  id: "01a0ba8f-f316-7b3e-8572-41880d418547",
  type: "page-type/text-property",
  slug: "device-token-push-type",
  propertySlug: "push-type",
  definition: "the sort of push a token takes",
  maxLength: 20,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sort is spelled the way Apple's `apns-push-type` header spells it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token naming no sort takes an alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token taking one sort of push takes no other.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
