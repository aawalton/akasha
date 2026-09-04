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
        "`folder-matches-a-shape` over `story` answers 20 refusals, down from 45. 17 are a `pages` folder mixing bare page files with per-page folders; either alone passes, and Alan has not said which. `story` wants the name `story-engine`, and a plural slug of `story` would not help, since 11 sibling folders open with `story-`. `story/story-engine-core` refuses by that same rule, and renaming it rewrites 23 imports outside story/. `story/world-mechanics/mechanics` wants its parent's name.",
    },
  ],
} as const satisfies Initiative
