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
        "Item 71779, rule 440d6e66. The addon was right: `resolveStockChainForCurrentChar` fills the character to the tier's targetQuantity, reads charEligibility, and sends on only the surplus. Alan holds ten and is eligible, so no surplus exists and nothing should move. The label lied, and f57605c makes it `Stock x10, rest to Bank`. Left: `resolveDestination` offline gives concrete empty for a rule carrying no flat destination and never reads destinationChain, so explain and plan show no tier.",
    },
    {
      statement:
        "An item the rules move to another place is moved once the character reaches that place.",
      workingMemory:
        "Soul Gem (Empty), 33265, resolves to `move-to` `bank` by soul-gems-empty-bank at index 57, cleanly matched, and the banker does not move it while other items do move. Unidentified Enchanter Survey Report, 219852, resolves to `move-to` `character:8796093022338107` by 118d98dd at 14, but the outcome is indeterminate: 3f8c330f at 13 wants the guild bank and cannot read maxStackSize. The tooltip shows the later rule's plan regardless. Unsettled: whether the addon acts on an indeterminate outcome.",
    },
  ],
  constraints: [
    "The rules are compiled outside the game, so a fix reaches the game only once the addon is built and deployed.",
    "Alan plays on this workstation, so a capture gains a field only after he next plays.",
  ],
} as const satisfies Initiative
