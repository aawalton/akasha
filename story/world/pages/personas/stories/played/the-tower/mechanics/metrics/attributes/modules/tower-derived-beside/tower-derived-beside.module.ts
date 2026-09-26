import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerDerivedBeside = {
  id: "01a0de52-84f3-78f1-ad5f-22cb50b36b09",
  type: "page-type/module",
  slug: "tower-derived-beside",
  definition: "the derived numbers of the character a Tower panel draws, worked from its pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character asked after is the player the game being drawn names.",
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
      decisionKind: "decision-kind/departure",
      statement: "A read answering no number falls back to the numbers the sheet kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
