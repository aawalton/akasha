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
        'Rewritten and deployed at f379cc99. `useInventory` reads the data.json beside the `temper-account` page through `askComposed` with `files: ["data"]`, held once for the signed-in user so the fifteen callers fetch it once. Measured at the page service: 200, 1.94 MB, 35 locations, seven keys parsing to exactly `InventoryDatabase`. assemble-inventory and chunks-loading are gone. Left: Alan confirming the tab draws, and `usePriceExtract` still answering null.\n',
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
