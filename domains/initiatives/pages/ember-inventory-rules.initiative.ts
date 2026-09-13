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
        "Alan says the wait predates the batching: optimization, not regression. His v6 trace: open-handler 3559ms, of which judging rules is 3124ms over 1235 runs and building facts only 281ms, so a facts cache is the wrong lever. cf2ac8b stops a run at the first match. Do not cache a slot's verdict across the three runs over the bank: the first locks the slot it judged, so the second must judge it afresh, and a cache would withdraw every lockable item.",
    },
    {
      statement: "A banker stacks what the bags hold that will stack.",
      workingMemory:
        "StackBag(bagId) is the whole of what the game exposes, and the bank's own Stack All Items keybind is one StackBag per visible tab. d29b73b stacks the backpack and the storage the visit opened, both bank bags where Alan subscribes, the moment the paced chain reports it drained, so no plan is left holding a slot index the stacking could move. Closing the bank early stacks nothing. The switch is the backpack autoStack one, whose label 4a601dd widens. Left: Alan to confirm.",
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
