import type { Initiative } from "../initiative.page-type.ts"

export const awenStoryCleanup = {
  id: "01a06cc9-3a10-7868-a962-917ffb04e8df",
  pageTypeSlug: "initiative",
  slug: "awen-story-cleanup",
  domainSlug: "domain/story-engine",
  personaSlug: "awen",
  intents: [
    {
      statement: "Typechecking a small patch costs a small patch's worth of memory.",
      workingMemory:
        "One changed path cost 7.88GB and 15.1s, and costs about 1.0GB and 2.8s now. The program was built over every indexed file however few paths changed, and asked for diagnostics with no file named, so it checked all 80967 and threw all but the roots away. Roots are now the change plus its importer closure. A hub file half the tree reaches still costs 1.08GB, so one path is about 1.0GB only where its closure is small. About 370MB of the overhead is unexplained. `typecheck` runs at patch phase alone.",
    },
  ],
} as const satisfies Initiative
