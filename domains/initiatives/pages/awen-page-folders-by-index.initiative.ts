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
        "All six sites are converted and verified, none of them now calling a listing: monarch-files, monarch-merchant-naming, email-rule-reading, lualib-pages, addon-compiler-config and addon-metadata-files. The addon-build pair landed as 7c464259 and 5a91cb4e. Each was checked against the tree first: 48 addon names resolve identically, 48 of 48 loaded-document maps match, and `temper-addon-typecheck` diffs clean. Whether these six were the whole population is being counted.\n",
    },
    {
      statement:
        "No page's code lists a folder off disk where the index answers the pages in that folder.",
      workingMemory:
        "`check-reaches-a-path-through-the-index` refuses zero listings: its listing rule needs the listing's argument to resolve to a known page path, which it never does. The tell recorded here before was wrong — monarch-merchant-naming filtered on a template of a constant and email-rule-reading on a `suffix` variable, so matching a suffix literal catches neither. The structural tell is a listing whose entries are selected by a suffix test, but that catches listings of Lua and of art too.\n",
    },
  ],
} as const satisfies Initiative
