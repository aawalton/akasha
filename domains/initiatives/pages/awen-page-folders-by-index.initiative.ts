import type { Initiative } from "../initiative.page-type.types.ts"

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
        "Four of six sites are converted and verified: monarch-files, monarch-merchant-naming, email-rule-reading, and lualib-pages, which still builds a byte-identical 110106-byte Lua 5.4 bundle. Two are left, both under temper/addon-build, and both are built over an arbitrary tree: their tests raise synthetic addon folders in /var/tmp and hand those in, so 5 of 12 fail the moment the index answers. A seventh site is `holdsDeclarations`, walking for type-declaration pages, 274 of which the index holds.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "`check-reaches-a-path-through-the-index` refuses zero listings and never refused six. Its audit counts run 37, 22, 8, 7, every one a `spells` refusal, which is nimue's intent on the same check page. Its two absences, plus an undeclared third where a literal handed to a parameter is not carried, hide all six real sites. Folding constants cannot reach a folder parameterised by person or discovered by a prior scan. The tell each site shares is the page-type suffix it filters names on.\n",
    },
  ],
} as const satisfies Initiative
