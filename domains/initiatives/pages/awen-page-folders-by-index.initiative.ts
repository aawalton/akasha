import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const awenPageFoldersByIndex = {
  id: "01a0823b-74ce-744f-a860-1dc482cbd1c9",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "awen-page-folders-by-index",
  domain: "domain/page",
  persona: "awen",
  constraints: ["Start this only once the day model is one page type."],
  intents: [
    {
      statement:
        "Code reaching the pages of a type asks the index for them rather than spelling their folder.",
      workingMemory:
        "The population is counted rather than guessed: 71 page code files call a listing, and 6 of those also spell a page file name the index answers a file for. web-app-reading, deploy-kind-reading and workload-applying landed as 3c66705f — verified before at 152 of 152 slugs identical, after at 6 of 6 web apps and 51 of 51 services read whole over 101 slugs. Left: synth-discovery, source-globbing, sibling-addons, addon-manifest-file, mobile-app.",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "The widening landed as 265b39c3 and was measured over the tree rather than read: a page's code that both lists and holds a plain literal naming a page-type file-name tail the index answers a file for. The audit gives 331 refusals, of which exactly 6 are this rule, over 5 files — the set predicted, less web-app-reading which 3c66705f converted. No exemption property was needed. It stays off a page's test, where it wrongly catches invented scratch pages.",
    },
  ],
} as const satisfies Initiative
