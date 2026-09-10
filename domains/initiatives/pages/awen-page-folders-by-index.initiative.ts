import type { Initiative } from "../initiative.page-type.types.ts"

export const awenPageFoldersByIndex = {
  id: "01a0823b-74ce-744f-a860-1dc482cbd1c9",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "awen-page-folders-by-index",
  domain: "workspace-package/page",
  persona: "awen",
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
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "The check judges where a literal reaches rather than what it spells, over every page's code. It refuses six listings. Two seek sidecars the index does not carry. `subagent-handed` seeks edit files whose page is gone, which the index can never answer. `message-file` lists because the index names four messages a composed flat path cannot reach. The bootstrap in `checkout-roots` waits on Alan, needing the checkout before an index is readable.\n",
    },
  ],
} as const satisfies Initiative
