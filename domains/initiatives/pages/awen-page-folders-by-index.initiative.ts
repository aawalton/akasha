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
        "The tell was run over the tree rather than reasoned about: a page's code that both calls a listing and holds a plain literal naming a page-type file-name tail the index answers a file for. That catches 6 of 71 files with no false positive, so it needs no exemption property and no ratchet over 67 files. It must stay off a page's test, where it wrongly catches invented scratch pages. Nimue holds the decision code, so the widening is not drafted.",
    },
  ],
} as const satisfies Initiative
