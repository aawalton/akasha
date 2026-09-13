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
        "A reading of the inventory outside the game reaches the answer the addon reaches.",
      workingMemory:
        "The addon persisted no per-item answer; the verdict-store module is Alan's own sell/nothing outbox, not the engine's. Landed 8ed0c8a1 and 899016e6 — the run resolving an item writes four flat fields onto the captured item, riding the reading already done: action, place, the route that resolved it, and a rule index only for an ordered rule. Covers backpack, worn and bank bags: 1205 of 1979 stacks; craft bag and house storage carry none. Measured +8.3% of 4.02 MB. Left: deploy, play, sweep.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
