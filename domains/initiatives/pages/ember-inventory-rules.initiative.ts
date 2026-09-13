import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "The game allows a hundred stack moves per ten seconds, withdrawals and deposits together. A batch of 26 was confirming 23 and aborting at 5096ms; 23 now go in 769ms with no retry, since 5ae05aa offers a partial slot only where it takes the whole move and b4855e82 re-issues a move only where it could land. 7bc8d00 leaves a chain one wake, and cbcf34e keeps what the bank was told across visits, so closing and reopening inside ten seconds spends one budget. Left: a real batch past the hundred.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
