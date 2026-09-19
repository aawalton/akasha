import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "page-type/initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "One word names a reading of the inventory, in a slug as in the prose.",
      workingMemory:
        "Landed: the command is `akasha temper inventory reading`, the modules are inventory-reading and watcher-inventory-landing, the account property is reading-locations, and watcher-settings-consumables' failure kinds and messages say reading. The pricing route keeps the word, which is the retired caller's address. Left: temper-net-worth-hour's snapshots, blocked by a gap in rename-page-property-property-slug that the finding names. StatSnapshot and taskProgressSnapshots name other things and stay.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
