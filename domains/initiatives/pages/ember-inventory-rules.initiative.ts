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
        "env-parity now puts the env explain runs in beside the env plan runs in over every stack, and reads clean; it was shown failing on a blinded env first. Its page says agreement there is no sign the addon agrees. parity does read the addon's own verdicts, but out of a lastExplain Alan must arm in game, one item at a time, and his capture holds none. Left: a sweep against what the addon itself decided, once it is known whether the addon already writes that.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
