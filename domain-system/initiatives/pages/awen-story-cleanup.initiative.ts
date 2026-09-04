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
        "`akasha audit --check folder-matches-a-shape --file-path story` answers 45 refusals over 60893 files. 34 are under `story/world-mechanics`, where each mechanic folder is named for a short plural like `skills` rather than `world-skills`, what its page type calls its folder. 18 are a `pages` folder holding bare page files; a `pages` folder holding one folder per page passes. The rest are `story` itself, holding two domain pages, and the package folders `engine`, `engine/core`, `tower` and `ui`.",
    },
    {
      statement: "The story/ tree passes the `invariant-statement-is-plain` check.",
      workingMemory:
        "`akasha audit --check invariant-statement-is-plain --file-path story` answers 31 refusals over 15 files: 15 join a second fact at a comma, 13 lean on a bare pronoun, 3 on a bare quantifier. `story/wandering-inn` holds 12 across three modules, `story/story-elements-played` 4, `story/named-events` 3, and the rest are singletons. The gate judges a whole file rather than the changed lines, so each of the 15 files is uneditable by anyone until its own backlog is cleared.",
    },
  ],
} as const satisfies Initiative
