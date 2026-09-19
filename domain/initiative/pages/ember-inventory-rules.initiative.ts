import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "page-type/initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "The addon and the outside reading agree on selling a crafted weapon or jewel.",
      workingMemory:
        "14 items, recorded `sell` by ordered-rule 49, where the fresh reading matches no rule at all. Rubedite Axe 45333, Mace 45334, Sword 45335, Battle Axe 45336, Maul 45337, Greatsword 45338, Dagger 45339, Ruby Ash Bow 45355, Inferno Staff 45364, Ice Staff 45365, Lightning Staff 45366, Restoration Staff 45367, Platinum Ring 54511, Platinum Necklace 54515. Every one is CP160 crafted gear. Unsettled: which side is right.\n",
    },
    {
      statement: "The addon and the outside reading agree on locking a set piece.",
      workingMemory:
        "10 items, recorded as matching no rule, where the fresh reading locks by ordered-rule 0. Slimecraw Mask 95044, Savage Werewolf's Ring 141440, Savage Werewolf's Necklace 141441, Savage Werewolf's Arm Cops, and six more of that shape. Rule 0 is the first rule of the ninety, so the fresh reading locks what the addon walked past.\n",
    },
    {
      statement: "The addon and the outside reading agree on storing a furnishing in the vault.",
      workingMemory:
        "8 furnishings, recorded `sell` by ordered-rule 43, where the fresh reading moves to furniture-vault by ordered-rule 44. Khajiit Bedding Padded 115653, Redguard Vessel Gilded 117903, Rough Crate Bolted 117954, Common Cargo Sealed 118051, and four more. The two rules sit next to each other, so rule 43 is what one side matches and the other does not.\n",
    },
    {
      statement: "The addon and the outside reading agree on using a bound affix script.",
      workingMemory:
        "6 Bound Affix Scripts, recorded `sell` by ordered-rule 83, where the fresh reading uses by ordered-rule 37. Interrupt, Savagery and Prophecy, Berserk and Lifesteal among them. Forty-six rules lie between the two, so the two sides part early rather than at the margin.\n",
    },
    {
      statement: "The addon and the outside reading agree on deconstructing a platinum jewel.",
      workingMemory:
        "2 items, recorded `deconstruct` by ordered-rule 60, where the fresh reading matches no rule. Platinum Ring 138796 over 8 stacks and Platinum Necklace 138797 over 17. These are the crafted jewels, apart from Platinum Ring 54511 and Platinum Necklace 54515, which part over selling instead.\n",
    },
    {
      statement: "The addon and the outside reading agree on which character a motif goes to.",
      workingMemory:
        "1 item: Crafting Motif 3, Wood Elf Style, 16428. Both sides use by ordered-rule 37, so the rule agrees and the character does not. Recorded character:8796093045974297 against fresh character:8796093045924843. This is the one shape where nothing about the rule is in doubt.\n",
    },
    {
      statement: "The addon and the outside reading agree on listing a companion's item.",
      workingMemory:
        "1 item: Companion's Greaves, recorded `list` by ordered-rule 47, where the fresh reading sells by ordered-rule 73.\n",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "A deploy is run in the foreground rather than backgrounded, since a backgrounded deploy waits in a queue.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
