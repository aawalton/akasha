import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const actionDraft = {
  id: "01a0eb37-e283-7d38-ba63-8f6ac63832b9",
  type: "page-type/text-property",
  slug: "action-draft",
  propertySlug: "action-draft",
  definition: "the words a story's player sees in the action bar, ready to edit and send",
  maxLength: 20000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn taken back puts its action here, so the player sees those words again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing sends these words but the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's next send takes this off.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
