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
        "The addon page states this and nothing checks it. outcome-parity compares two traversals of one engine, so it read clean while two engines sent 84 items to different places; its page now says so. The blindnesses behind that are shut: the plan context lacked skill-line ranks and curse state, and the CLI env answered unknown for stock it held. Left: a command putting the two engines side by side, shown failing on a blinded engine before it is trusted.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
