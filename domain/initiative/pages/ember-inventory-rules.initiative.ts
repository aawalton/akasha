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
        "10 items, recorded as matching no rule, where the fresh reading locks by rule 0 `controlled:character:lock-worn`. Slimecraw Mask 95044, Savage Werewolf's Ring 141440, Necklace 141441, Arm Cops and six more. This one is a stale record, not a missing input: all ten are worn by 8796093022613905, scanned 1789500924, where 8796093049297261, scanned 3.2 days later, records `lock` by rule 0 on the same facts. A worn slot is ruled on again only when that character opens the inventory.",
    },
    {
      statement: "The addon and the outside reading agree on storing a furnishing in the vault.",
      workingMemory:
        "8 furnishings, recorded sell by rule 43, where a fresh reading moves them to furniture-vault by rule 44. Elsweyr Incense Burner 151661, Colovian Meal Poultry 204693 and six more. Mended on both sides and deployed at 84decaf2: a bound thing carries a replacement value and no market value, in the addon's own facts and in the reading outside. Left: Alan plays, the addon writes these rows again, and one parity run says whether the two now agree.",
    },
    {
      statement: "The addon and the outside reading agree on which character a motif goes to.",
      workingMemory:
        "1 item: Crafting Motif 3 Wood Elf Style 16428. Recorded Ceria Springwater, fresh Mrsha du Marquin, both by rule 37. The second cause is mended: eaade2f orders a master motif by fewest known chapters on both sides, proven by test. It does not move this row. What remains is the first cause: the stack sits in Mrsha's own bag carrying `known` true, and `knowsItemForChar` passes that flag over and wants the whole 14-chapter set, which her motifKnowledge lacks.",
    },
    {
      statement: "The addon and the outside reading agree on listing a companion's item.",
      workingMemory:
        "1 item: Companion's Greaves 177029, recorded list by rule 47, where a fresh reading sells by rule 73. The same bound-thing price drop as the furnishings, mended by the same change and deployed at 84decaf2. Left: Alan plays and one parity run says whether the two now agree.",
    },
    {
      statement: "One reading of what a character knows answers a command and the rules alike.",
      workingMemory:
        "The knowledge command reads motifChaptersByStyle alone, at temper-inventory-knowledge:96, where the rules read motifKnowledgeByStyle first and fall back to it, at inventory-eval-env:188-189. The capture fills the two differently, so the command answers false where the rules answer true, and reading the command misleads.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
