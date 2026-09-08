import type { Initiative } from "../initiative.page-type.ts"

export const awenPageFoldersByIndex = {
  id: "01a0823b-74ce-744f-a860-1dc482cbd1c9",
  pageTypeSlug: "initiative",
  slug: "awen-page-folders-by-index",
  domainSlug: "workspace-package/page",
  personaSlug: "amy",
  constraints: ["Start this only once the day model is one page type."],
  intents: [
    {
      statement:
        "Code reaching the pages of a type asks the index for them rather than spelling their folder.",
      workingMemory:
        '48 files have a constant such as `"seat-system/seats/pages"` and then read that folder off disk, where `listedAt` and `listedWithin` under `pages/indexes/reading` answer by page type slug. The breakage that raised this is mended, so what is left is that the index holds these answers and the code re-derives them.',
    },
    {
      statement:
        "A check refuses a path spelled as text where the index answers what that path reaches.",
      workingMemory:
        "`21afe5ce74` refuses a carry that empties a folder a body still spells, which catches a path as that path goes stale rather than catching the spelling. A workstation-service spells a path to a module's code file inside the shell command line it runs, and one of those runs no module at all, so the rule either admits that shape or the `runs` lines become a question of their own.",
    },
  ],
} as const satisfies Initiative
