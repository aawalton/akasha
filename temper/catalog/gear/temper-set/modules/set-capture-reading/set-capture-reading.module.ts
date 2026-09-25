import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCaptureReading = {
  id: "01a0d8c5-6849-7240-a278-39392a74c2a7",
  type: "page-type/module",
  slug: "set-capture-reading",
  definition: "the reading taking each set's collection pieces out of a catalog capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is matched to its page by the set id the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type is written as the constant the same capture names its number by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number only a none or invalid constant names is written as no type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set none of whose pieces names an item id is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture with no set naming an item id is read as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's title is restated where the game spells the set's name otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every list is taken off every page before the capture's lists are put on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set the game has and no page states is named rather than given a page.",
    },
  ],
} as const satisfies Module
