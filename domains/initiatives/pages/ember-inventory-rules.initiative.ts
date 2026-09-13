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
        "cf2ac8b stops a rule run at the first match; 0e0adca judges each bank slot once in the withdraw sweep; ab9376db has the bank action panel count from that sweep rather than making a third of its own. Together: open handler 3559ms to 488ms, panel 272ms to 16ms, sweep 509ms to 297ms, facts built 1510 to 730. A merchant is 35ms. Never cache a slot's verdict across sweeps: the first locks the slot it judged, so the second must judge it afresh.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "The game allows a hundred stack moves per ten seconds across withdrawals and deposits together, and b81c289 spends that over a sliding ten seconds. 5ae05aa offers a partial slot only where it takes the whole move, and stops the caller dropping the reservation that had aimed three stacks at one slot; b4855e82 re-issues a move only where that could land it. A batch of 26 was confirming 23 and aborting at 5096ms; 23 now go in 769ms with no retry. Left: a batch past the hundred.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
