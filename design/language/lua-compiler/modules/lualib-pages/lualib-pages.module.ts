import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lualibPages = {
  id: "01a0818b-cd49-79f1-95e9-0b5ce73c5bb7",
  type: "module",
  slug: "lualib-pages",
  definition: "the source file each lualib page names, in place of the file a tsconfig scan finds",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lualib pages are the index's answer for their page type in this checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's code file takes the place of the scanned file named for the page's Lua export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scanned file no page names is taken from the scan unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scanned file that is a page's own code file is taken from the page instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build for Lua 5.0 takes a page's Lua 5.0 code where the page states that code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A build for Lua 5.0 names the code each page's Lua 5.0 code is taken in place of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import naming the code of a page holding Lua 5.0 code names that page's feature.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Lua export names its feature once the export's `__TS__` prefix is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Lua export naming a feature outright names that feature.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Lua export names its feature once the export's first letter is upper-cased.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming no lualib feature either way refuses the build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the page's path and the name the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's stated lua feature takes the place of the feature its Lua export names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two pages naming one lualib feature refuse the build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names both pages' paths and the feature the two name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose code file is not there is passed over.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A page whose slug is no export name reads as nothing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The code file of a page whose slug is no export name is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming a feature the scan found nowhere is added after the scanned files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages say how a source file's name reaches a feature name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page at all answers with the scanned files themselves.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here imports a page to read that page.",
    },
  ],
} as const satisfies Module
