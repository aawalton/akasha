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
      statement:
        "A destination chain hands an item to the first tier whose eligibility that character meets.",
      workingMemory:
        "Item 71779 matches rule 440d6e66: `scrolls`, `stock`, not-stolen, name Counterfeit Pardon Edict. Its chain is `character:by-priority` at ten where any of world-legerdemain, guild-thieves-guild or guild-dark-brotherhood is not maxed, then `bank`. The tooltip says Stock On Bank (x10) and nothing moves; `explain 71779` gives that rule matched with destination and resolvedDestination both null. Alan holds ten and has not maxed those lines, so the first tier is right and the tooltip is wrong.",
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
