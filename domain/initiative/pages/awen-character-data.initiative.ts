import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenCharacterData = {
  id: "01a17ead-74c1-7bc6-853a-b8e38597db67",
  type: "page-type/initiative",
  slug: "awen-character-data",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "A story item states its category.",
      workingMemory:
        "Generic mechanics sit under `story/world/mechanics/`, per-story subtypes under each story's `mechanics/`. `story-item` has no category; `world-skill` has no XP or governing attribute; `ability` is only a domain; `world-title` links to no character; only The Tower has attribute points. Each piece is then shown in its tab of the character panel (`awen-character-panel`).\n",
    },
    { statement: "A skill states the attribute that governs it." },
    { statement: "A skill states its experience toward its next level." },
    { statement: "A character states the titles it holds." },
    { statement: "Level-up choices are a generic mechanic rather than The Tower's alone." },
  ],
  constraints: ["Alan approves the shape of each new page type or property before it is built."],
  createdAt: "2026-10-27T18:44:19.264Z",
  updatedAt: "2026-10-27T18:57:04.023Z",
} as const satisfies Initiative
