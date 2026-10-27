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
  ],
  createdAt: "2026-10-27T18:44:19.264Z",
  updatedAt: "2026-10-27T19:48:04.626Z",
} as const satisfies Initiative
