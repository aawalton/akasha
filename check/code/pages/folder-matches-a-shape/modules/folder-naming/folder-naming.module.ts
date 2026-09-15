import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const folderNaming = {
  id: "01a08862-ae61-7aba-8958-91c3c7732e22",
  type: "module",
  slug: "folder-naming",
  definition: "the name a folder is asked for, and the page that name is asked against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a folder is named against is the nearest page above that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named for a part is looked through when that page is looked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named for a part that the page in it names is that page's own folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The name a folder is asked for has the opening that name shares with that page taken off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That opening is taken off again while the name left still opens with such a name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder is asked for no name where taking that opening off leaves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder with nothing above it is asked for no name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which names are a part's are handed in rather than written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the folder does not carry yet is asked against that page the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rename asks that name here rather than working the name out again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a folder.",
    },
  ],
} as const satisfies Module
