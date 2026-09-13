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
        "StackBag(bagId) is the whole of what the game exposes. d29b73b stacks the backpack and the storage the visit opened, both bank bags where Alan subscribes, once the paced chain drains. A bank closed early now stacks too: cleanup leaves no plan holding a slot index, and the backpack is already stacked after every zone load. Whether StackBag reaches a bank bag after close is unproven, so bfcfbfd counts partial stacks either side of each call and a dozen visits settle it.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "Alan asked for batches of fifty five seconds apart and 6db0e2e batches that way; e136999 takes the per-visit cap of fifty off both loops. His 37-move visit: planned 37, issued 40, confirmed 36, 3 retries, span 17009ms, closed at 22749ms still unsettled. everyMoveLanded is unanimous, so one stuck move denies the other 36 their early settle and then takes four attempts of five seconds alone. That cooldown says how fast to send and is wrong as the timeout for calling a move failed.",
    },
    {
      statement: "An Experience Commendation the character carries reaches the bank.",
      workingMemory:
        "Alan handed the link for Major Experience Commendation (224714, scrolls) and asked for Move to Bank for now. fe8bd926 is that rule: scrolls whose name holds `commendation`, non-stolen, to bank, and the batched upsert in 1007046f let `rule reorder` place it at 34, ahead of 263273e9 which takes every non-stolen scroll. 298663dd narrows the automation cascade from `experience` to `experience scroll`. Left: Alan to reload and confirm.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
