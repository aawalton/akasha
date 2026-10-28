import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCraftedSeen = {
  id: "01a183cf-2170-7bf1-a68a-ca3dcf95b432",
  type: "page-type/module",
  slug: "inventory-crafted-seen",
  definition: "the second the addon first saw each crafted item, kept by the item's unique id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The second a crafted item is first seen is taken as the second it was crafted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafted item reaching a slot during play is stamped with the second it arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafted item a bag held the first time this module scanned that bag is stamped as held before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item held before the stamp was crafted before today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stamp is kept by unique id, so an item keeps its stamp as it moves between bags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dated stamp is dropped once it is thirty days old.",
    },
  ],
  createdAt: "2026-10-28T18:39:12.240Z",
  updatedAt: "2026-10-28T18:39:12.240Z",
} as const satisfies Module
