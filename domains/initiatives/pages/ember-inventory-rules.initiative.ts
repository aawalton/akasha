import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const emberInventoryRules = {
  id: "01a095cd-5db5-7e4b-ac28-81095f7b5fd3",
  type: "initiative",
  slug: "ember-inventory-rules",
  domain: "domain/temper",
  persona: "ember",
  intents: [
    {
      statement: "The plan an item's tooltip states is the plan the venue carries out.",
      workingMemory:
        "The tooltip re-evaluates the compiled rules; a venue reads the pending action `applyAction` recorded. `sell` recorded none, alone of eighteen, so the store fell back to the game's junk flag and an item ESO refuses to junk showed Sell and never sold. 80631ab records it, a238ade stops the plan counting it twice, 0b0341a names destroying. Six of the shape are left and latent: `stock` to the furniture vault, cross-character `fence-sell`, `character-equip`, `refine`, `mail`, `use`.",
    },
    {
      statement: "The reading outside the game resolves a destination chain as the addon does.",
      workingMemory:
        "The addon reads research and crafting rank off the saved-variables blocks the reading off the game reads too, never a live game call, so the data was handed over rather than the addon's absent-as-false copied. ca39ecb and a5d23d6 hand `plan` and `explain` the crafting levels, cooldowns and transmute figures; 6e4e794 parses `traitResearch`. Rules 47 and 50 now reject rather than go indeterminate. edcae86 mends the addon matching a cased trait name against a lowered one.",
    },
    {
      statement:
        "An item the rules move to another place is moved once the character reaches that place.",
      workingMemory:
        "Root cause found and fixed in 66c358e7. The withdrawal side judged every storage slot before reading pending actions off it; the deposit side read the backpack cold. Its only writer outside a full rescan is the slot handler, which returns early on a non-default update reason and skips a slot already carrying an action it does not call stale. onOpenBank now calls refreshBackpackActions first. Left: Alan to confirm the Soul Gem goes on one visit.",
    },
    {
      statement:
        "A visit to the banker moves every item the rules send there, however many there are.",
      workingMemory:
        "Alan asked for batches of fifty five seconds apart. 6db0e2e replaces the one-move-at-a-time chain in inventory-rules-dispatch-bank-paced: fifty go out at once, then five seconds, then each is checked against its source stack and one that did not land is carried forward, up to four attempts. A move given up on no longer abandons the moves behind it. Left: MAX_OPS in inventory-rules-dispatch-bank caps a visit at fifty withdrawals and fifty deposits, a cap the batching makes unnecessary.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
