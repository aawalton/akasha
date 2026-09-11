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
        "71 page code files call a listing; 6 also spell a page file name the index answers a file for. Landed: the deploy readers, the mobile scripts through `listedAt`, the source globber through the naming grammar, the addon manifests as an `eso-addon` page's own file, and synth discovery as the code file of every `manifest` page. Measured each time: 152 slugs, 105 scripts, 16 stylesheets, 48 addons, 56 synths. Retyping the five `module` synths `manifest` restored a synth the spelled folder lost.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "The widening is landed and was measured over the tree: a page's code that both lists and holds a plain literal naming a page-type file-name tail the index answers a file for. The audit gives 270 refusals over 42 files, and none is this rule. It stays off a page's test, where it wrongly catches invented scratch pages. A page type reached through a template is still unseen. The two whole-repo sweeps left are neither this rule: the import sweeps in `source-globbing` and `dockerfile-imports`.\n",
    },
  ],
} as const satisfies Initiative
