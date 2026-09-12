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
        "Item 71779, rule 440d6e66. `resolveDestination` plans a stock rule's chain through `planStockChainVisit`, the planner the addon plans it through, so `explain 71779` answers destination `bank` and label `Stock x10`. `EvalEnv` gained the three eligibility lookups: off the game the ranks and the curse state come from the characters capture, and whether a character can level a morph is unknown. Left: plan routes a chain through items-rules-routing rather than through `resolveDestination`.",
    },
    {
      statement:
        "An item the rules move to another place is moved once the character reaches that place.",
      workingMemory:
        "Alan tested after 9b90a46 and 0fc09ae: 219852 now moves to Erin Solstice, and every other deposit lands. Soul Gem (Empty) 33265 alone still needs a second visit to the banker, and goes on that second visit. So the rule matches and the filters admit it; what drops it is the deposit budget, the storage slot search, or the paced chain losing it behind a move that stalled.",
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
