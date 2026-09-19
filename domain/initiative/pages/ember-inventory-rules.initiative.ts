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
        "Where the addon now walks a worn piece the two readings agree. Shaestrel's 12 and Seraphel's 7 were judged fresh, rule 0 locked them, and after locking both readings say no-match, so neither raises a row. The 18 rows left are Erin's 9 and Three-Color Stalker's 9, whose records predate the stamp and carry no resolvedAt. They clear when those two are next played. Landed 270c5de0 and 90fe9d34, deployed at c978e68c.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
