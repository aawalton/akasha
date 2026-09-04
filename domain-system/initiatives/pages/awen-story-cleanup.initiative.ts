import type { Initiative } from "../initiative.page-type.ts"

export const awenStoryCleanup = {
  id: "01a06cc9-3a10-7868-a962-917ffb04e8df",
  pageTypeSlug: "initiative",
  slug: "awen-story-cleanup",
  domainSlug: "domain/story-engine",
  personaSlug: "awen",
  intents: [
    {
      statement: "All story engine and story content files are organized in the story/ folder.",
      workingMemory:
        "The one displaced tree is `games/games`: the `game` page type, 29 properties, 8 game pages and 56 payload files, claimed by `domain/games`. `game` is a story Alan plays through with a persona running the other side, and `story/engine/core/game-url` hard-codes its slug; no import crosses either way, though `games/idle-games` takes one property. `alan/world-lore` and `alan/narrative-production` are story domains under `alan`. All 17 page types and six packages are already under `story/`.",
    },
    {
      statement: "The story/ tree passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path story` answers 44 refusals over 60801 files. 34 are under `story/world-mechanics`, where each mechanic folder is named for a short plural like `skills` rather than `world-skills`, what its page type calls its folder, and its `pages` folder holds many pages rather than one. The rest are `story` itself holding two domain pages, the package folders `engine`, `engine/core`, `tower` and `ui`, and three more `pages` folders.",
    },
  ],
} as const satisfies Initiative
