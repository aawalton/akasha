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
        "The population was counted rather than guessed: 71 page code files call a listing, and 6 of those also spell a page file name the index answers a file for. Landed are the deploy readers, the mobile scripts through `listedAt`, the source globber through the naming grammar, and the addon manifests as the file an `eso-addon` page carries. Each was measured before and after: 152 of 152 slugs, 105 of 105 scripts, 16 of 16 stylesheets, 48 of 48 addons. Only synth-discovery is left.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "The widening is landed and was measured over the tree rather than read: a page's code that both lists and holds a plain literal naming a page-type file-name tail the index answers a file for. The audit now gives 276 refusals over 44 files, of which exactly 2 are this rule, both in synth-discovery. It stays off a page's test, where it wrongly catches invented scratch pages. A page type reached through a template rather than a plain string is still unseen.\n",
    },
  ],
} as const satisfies Initiative
