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
        "`folder-matches-a-shape` over `story` answered 19 refusals and answers 3. 18 were a `pages` folder holding page files beside per-page folders; the shapes settle which way rather than Alan, because one page carrying a file beside it puts every page in that folder into a folder of its own. 489 pages moved that way. Left: `story-chapters-read` opens with the `story` above it and holds 37946 files, and its 13 siblings all dropped that prefix. Two refusals and an EISDIR throw are filed as findings.",
    },
    {
      statement: "Typechecking a small patch costs a small patch's worth of memory.",
      workingMemory:
        "One changed path cost 7.88GB and 15.1s, and costs about 1.0GB and 2.8s now. The program was built over every indexed file however few paths changed, and asked for diagnostics with no file named, so it checked all 80967 and threw all but the roots away. Roots are now the change plus its importer closure. A hub file half the tree reaches still costs 1.08GB, so one path is about 1.0GB only where its closure is small. About 370MB of the overhead is unexplained. `typecheck` runs at patch phase alone.",
    },
  ],
} as const satisfies Initiative
