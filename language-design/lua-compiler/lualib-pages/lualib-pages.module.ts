import type { Module } from "@akasha/code/module"

export const lualibPages = {
  id: "01a0818b-cd49-79f1-95e9-0b5ce73c5bb7",
  pageTypeSlug: "module",
  slug: "lualib-pages",
  definition: "the source file each lualib page names, in place of the file a tsconfig scan finds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lualib pages are read from the `lualibs` folder beside the compiler.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's code file takes the place of the scanned file named for the page's Lua export.",
    },
    {
      invariantKind: "departure",
      statement: "A scanned file no page names is taken as the scan found it.",
    },
    {
      invariantKind: "departure",
      statement: "A build for Lua 5.0 takes a page's Lua 5.0 code where the page holds one.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no lualib feature is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose code file is not there is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page naming a feature the scan found nowhere is added after what the scan found.",
    },
    {
      invariantKind: "departure",
      statement: "A feature name is reached from a source file's name by what the pages say.",
    },
    {
      invariantKind: "departure",
      statement: "No page at all answers with the scanned files themselves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here imports a page to read it.",
    },
  ],
} as const satisfies Module
