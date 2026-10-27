import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCharacterPanel = {
  id: "01a17ead-74c1-7d79-95f9-216dc0793812",
  type: "page-type/initiative",
  slug: "awen-character-panel",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "The character panel's tabs are Stats, Inventory, Skills, Traits and Abilities.",
      workingMemory:
        "The card is `PlayerCharacterPanel` in `story/ui/modules/player-character-panel/`, with tabs in `story/ui/modules/sheet-panel/`; data from `story/world/stories/played/modules/played-state-beside/`. Its decisions already hide empty slots and unrevealed pages. Voyage (`domain/voyage`) is the reference. Test on Overwhere III (Nala) and The Tower. `awen-character-data` adds the missing data; draw what exists now.\n",
    },
    { statement: "A character panel tab with nothing to show is hidden." },
    {
      statement:
        "The Stats tab shows portrait, name, titles, level with an XP bar, resources and attributes.",
    },
    {
      statement:
        "The Inventory tab has a search, and each item shows its quantity and opens to its description.",
    },
    { statement: "The Inventory tab switches to an Equipped view of the filled slots." },
    {
      statement:
        "The Skills and Traits tabs each have a search, and each entry opens to its description.",
    },
    { statement: "Use, Equip, Unequip and Drop buttons send a turn rather than change state." },
  ],
  createdAt: "2026-10-27T18:44:19.264Z",
  updatedAt: "2026-10-27T18:44:19.264Z",
} as const satisfies Initiative
