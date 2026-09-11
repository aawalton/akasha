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
        "71 page code files call a listing; 6 also spell a page file name the index answers a file for. Landed: the deploy readers, the mobile scripts, the source globber through the naming grammar, the addon manifests, synth discovery as the code file of every `manifest` page, the runs of a name series, and the tunnel routes. Measured each time: 152 slugs, 105 scripts, 16 stylesheets, 48 addons, 56 synths, 38 runs, 7 route files.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "The widening is landed and measured over the tree: a page's code that both lists and holds a plain literal naming a page-type file-name tail. Neither listing rule refuses anything now. Every one of the 60 listing sites in a page's code was then read: `name-series` and `tunnel-route-discovery` were sweeping and now ask the index. A literal naming a file property's own file name is left unjudged; 30 of those 37 names are chosen outside akasha and spelled for a foreign tool.\n",
    },
  ],
} as const satisfies Initiative
