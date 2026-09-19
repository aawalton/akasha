import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "page-type/initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "The web shows the inventory an account's last reading landed.",
      workingMemory:
        "Nothing shows it yet. `useInventory` asks for `temper-inventory-snapshot` and then `temper-inventory-chunk`, neither of which is a page type, so it answers null at fifteen call sites in eleven modules and every one of them draws an empty account. The reading is row files beside the account's `temper-account` page — reading-locations, bag-sizes, crafting-levels, placed-furnishings, currencies, stacks — with capturedAt and totalValue on the page and a data.json beside it.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
