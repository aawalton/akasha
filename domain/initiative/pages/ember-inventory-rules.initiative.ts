import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "page-type/initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "The addon and the outside reading agree on locking a set piece.",
      workingMemory:
        "18 worn pieces, recorded nothing by no-match, where a fresh reading locks by rule 0 controlled:character:lock-worn. Not stale after all: Erin's worn slots were scanned at 1789786678 under the current addon, every one with locked false, and the compiled rule in the capture reads as the repo's does, location worn and locked not-locked. The addon writes no-match only where findMatchedRule gives nothing, so matchRules answered something other than matched on facts a fresh reading matches rule 0 on.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
