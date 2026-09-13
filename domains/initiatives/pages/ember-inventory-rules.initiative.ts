import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement: "A merchant or a banker opens without a wait Alan notices.",
      workingMemory:
        "Alan notices a wait. The bank trace already records openHandlerMs, scanBankBagsMs, refreshPanelMs, withdrawMs, depositMs and a settling breakdown, and 8ff2273 keeps the last ten visits, so the spend is measurable rather than guessed. Suspect 66c358e7 first: it added refreshBackpackActions at bank open, a second full judging of the backpack beside the one freezeStockBackpackCounts already does over the same slots.",
    },
    {
      statement: "A banker stacks what the bags hold that will stack.",
      workingMemory:
        "Alan says the banker offers a Stack All Items action and asks whether it can simply be called. StackBag is already called on the backpack at login in inventory-events. Settle what the game exposes at a bank and call it rather than composing stacking here.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "Alan asked for batches of fifty five seconds apart, and 6db0e2e batches inventory-rules-dispatch-bank-paced that way, carrying an unlanded move forward up to four attempts. e136999 then takes the per-visit count of fifty off both loops: a visit withdraws until the configured backpack buffer or a full backpack, deposits until storage has no room, and each prints on stopping. 1edea38 says what a closed bank left unsent. Left: Alan to confirm one trip does it.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
