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
        "The game allows a hundred stack moves per ten seconds, withdrawals and deposits together. A batch of 150 goes out over two rounds with no retry, and two visits inside the ten seconds spend one budget. A slot holds one item, so a move onto a slot holding another item is sent once and left, and a move is confirmed by the item that left its source slot rather than by what that slot holds. Left: a real batch past the hundred, and why a withdrawal is aimed at a slot another item has taken.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
