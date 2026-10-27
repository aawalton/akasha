import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenGiftedStory = {
  id: "01a17ed1-bbbc-7f28-81c4-6ef774dab60d",
  type: "page-type/initiative",
  slug: "awen-gifted-story",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "The story names a panel in each of the character, journal and chat places.",
    },
    { statement: "Alan is offered the story once the engine plays a story beat by beat." },
    {
      statement:
        "Once beats flow, the story has a game master and the persistent seats of each step.",
    },
  ],
  constraints: [
    "Only Alan takes turns in the story.",
    "The world follows the Gifted book's premise, except that the one reborn is a girl.",
  ],
  createdAt: "2026-10-27T19:23:56.731Z",
  updatedAt: "2026-10-27T19:48:48.612Z",
} as const satisfies Initiative
