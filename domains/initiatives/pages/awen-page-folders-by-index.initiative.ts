import type { Initiative } from "../initiative.page-type.ts"

export const awenPageFoldersByIndex = {
  id: "01a0823b-74ce-744f-a860-1dc482cbd1c9",
  pageTypeSlug: "initiative",
  slug: "awen-page-folders-by-index",
  domainSlug: "workspace-package/page",
  personaSlug: "awen",
  constraints: ["Start this only once the day model is one page type."],
  intents: [
    {
      statement:
        "Code reaching the pages of a type asks the index for them rather than spelling their folder.",
      workingMemory:
        "A page type has no one folder: `readout` pages sit under `readouts/pages`, `alan/attributes/readouts` and `temper/temper-progress/readouts`, so a folder literal finds thirteen of twenty. `everyOfType` under `pages/indexes/reading` answers by page type slug and finds all twenty. Fourteen files are converted. What is left spells a folder to write a page into, to watch a page arrive in, to ship as a directory, or to find what outlives a page, and the index answers none of those.\n",
    },
    {
      statement:
        "A check refuses a path spelled as text where the index answers what that path reaches.",
      workingMemory:
        "`21afe5ce74` refuses a carry that empties a folder a body still spells, which catches a path as that path goes stale rather than catching the spelling. A workstation-service spells a path to a module's code file inside the shell command line it runs, and one of those runs no module at all, so the rule either admits that shape or the `runs` lines become a question of their own.",
    },
  ],
} as const satisfies Initiative
