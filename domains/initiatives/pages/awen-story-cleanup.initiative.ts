import type { Initiative } from "../initiative.page-type.ts"

export const awenStoryCleanup = {
  id: "01a06cc9-3a10-7868-a962-917ffb04e8df",
  pageTypeSlug: "initiative",
  slug: "awen-story-cleanup",
  domainSlug: "domain/story-engine",
  personaSlug: "awen",
  intents: [
    {
      statement: "The story/ tree passes the `folder-matches-a-shape` check.",
      workingMemory:
        "`folder-matches-a-shape` over `story` answered 19 and answers 2, both one conflict: a page whose slug opens with its type's slug sits in no folder that passes, because the shape reads a folder's name off its one page. `world-tree-trilogy` is the name the book series and the story read carry, and one doctrine pack is ever here. Which rule yields is Alan's, and it is 194 of athena's 196 refusals over `commands/`. Filed as `two-pages-bind-a-page-own-folder-name-and-disagree`.",
    },
    {
      statement: "Typechecking a small patch costs a small patch's worth of memory.",
      workingMemory:
        "One changed path cost 7.88GB and 15.1s, and costs about 1.0GB and 2.8s now. The program was built over every indexed file however few paths changed, and asked for diagnostics with no file named, so it checked all 80967 and threw all but the roots away. Roots are now the change plus its importer closure. A hub file half the tree reaches still costs 1.08GB, so one path is about 1.0GB only where its closure is small. About 370MB of the overhead is unexplained. `typecheck` runs at patch phase alone.",
    },
  ],
} as const satisfies Initiative
