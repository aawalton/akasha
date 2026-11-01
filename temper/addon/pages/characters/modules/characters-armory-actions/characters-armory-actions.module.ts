import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryActions = {
  id: "01a198da-8335-7aa8-bafc-8b4929c7e49b",
  type: "page-type/module",
  slug: "characters-armory-actions",
  definition: "equipping, saving and renaming a build from the Temper Armory",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each action asks first in the words the game's Armory asks in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Equipping a build makes it the build the character is set up as and applies it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build saved new in the game is set up by the change that made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Equipping a build with no curse while cursed offers the Crown Store's free cure.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Equipping never buys a curse, as a curse costs crowns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an equip did is said in a dialog once it is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saving a build saves what the character wears and has slotted over that build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new build is named and given an icon before it is saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is renamed and given an icon through the game's own settings dialog.",
    },
  ],
  createdAt: "2026-11-01T20:43:39.700Z",
  updatedAt: "2026-11-01T22:08:40.518Z",
} as const satisfies Module
