import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftingEventsInventory = {
  id: "01a061c7-e877-7485-ab99-a082b1282463",
  type: "page-type/module",
  slug: "crafting-events-inventory",
  definition: "what the add-on does when a bag slot or the player's gold changes",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot cached before the slot listeners were registered is given its link then.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot in the furniture vault is not counted, so its removal is passed over.",
    },
  ],
  code: "ts",
} as const satisfies Module
