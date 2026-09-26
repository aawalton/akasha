import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const derivedBeside = {
  id: "01a0de74-5fb3-7593-a73d-196114cb52c0",
  type: "page-type/module",
  slug: "derived-beside",
  definition: "the derived numbers of the character a panel draws, worked from its pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character asked after is the player the game being drawn names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The formulas worked are the ones the story's own panel hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel handing in no formula reads nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derived number is worked by its own formula from the character's metrics.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derived number is named by its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's numbers count only where the character holds that item in a slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item number no held item carries counts as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derived number whose formula refuses is left out.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
