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
        "`game` and its 8 pages moved to `story/games`, and `domain/story-engine` claims the type in place of `domain/games`. Every game names awen as its engine. Each already had a matching `story-played` page with its turns mirrored one for one as `story-turn-played` pages — 12, 18, 18, 20, 32, 2, 33, 4, every count exact — so `game` is the head of a pipeline `narrative-story-turn-promotion` gathers into chapters. Left: `alan/world-lore` and `alan/narrative-production`.",
    },
    {
      statement: "The story/ tree passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`akasha audit --check folder-matches-a-shape --file-path story` answers 44 refusals over 60801 files. 34 are under `story/world-mechanics`, where each mechanic folder is named for a short plural like `skills` rather than `world-skills`, what its page type calls its folder, and its `pages` folder holds many pages rather than one. The rest are `story` itself holding two domain pages, the package folders `engine`, `engine/core`, `tower` and `ui`, and three more `pages` folders.",
    },
  ],
} as const satisfies Initiative
