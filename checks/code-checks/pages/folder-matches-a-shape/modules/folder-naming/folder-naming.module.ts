import type { Module } from "@akasha/code/module"

export const folderNaming = {
  id: "01a08862-ae61-7aba-8958-91c3c7732e22",
  pageTypeSlug: "module",
  type: "module",
  slug: "folder-naming",
  definition: "the name a folder is asked for, and the page that name is asked against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page a folder is named against is the nearest page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named for a part is looked through when that page is looked for.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named for a part that the page in it names is that page's own folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name a folder is asked for has the opening it shares with that page taken off.",
    },
    {
      invariantKind: "departure",
      statement: "That opening is taken off again while what is left still opens with such a name.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is asked for no name where taking that opening off leaves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Which names are a part's are handed in rather than written here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a folder.",
    },
  ],
} as const satisfies Module
