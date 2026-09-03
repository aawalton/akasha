import type { Module } from "@akasha/code-system/module"

export const inventoryRuleSettingsShape = {
  id: "01a068e2-226a-7523-928d-85398937e67c",
  pageTypeSlug: "module",
  slug: "inventory-rule-settings-shape",
  definition: "what unknown JSON holds to be read as a player's inventory rule settings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Settings arrive as JSON nobody has vouched for.",
    },
    {
      invariantKind: "departure",
      statement: "Only version two is read.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is required to carry an id and an action and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "Settings written by a newer temper are still read by an older temper.",
    },
    {
      invariantKind: "gap",
      statement: "Every action name is written out again here.",
    },
  ],
} as const satisfies Module
