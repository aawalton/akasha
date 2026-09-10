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
        "`valuesOfType` and `everyOfType` answer by page type slug from one index read. Six sites listed a page folder to read its pages. `monarch-files` and `monarch-merchant-naming` are converted and run true: 56 categories, 32 accounts, 2 tags, 3 holdings, 1 direction, 50 merchants, and every merchant names itself from its own pattern. Four are left, and each has a folder that is a runtime value rather than a literal. No site anywhere spells a folder to write a page into.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "`check-reaches-a-path-through-the-index` refuses zero listings and never refused six. Its audit counts run 37, 22, 8, 7, every one a `spells` refusal, which is nimue's intent on the same check page. Its two absences, plus an undeclared third where a literal handed to a parameter is not carried, hide all six real sites. Folding constants cannot reach a folder parameterised by person or discovered by a prior scan. The tell each site shares is the page-type suffix it filters names on.\n",
    },
  ],
} as const satisfies Initiative
