import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const lualibPages = {
  id: "01a0818b-cd49-79f1-95e9-0b5ce73c5bb7",
  pageTypeSlug: "module",
  type: "module",
  slug: "lualib-pages",
  definition: "the source file each lualib page names, in place of the file a tsconfig scan finds",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lualib pages are the index's answer for their page type in this checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's code file takes the place of the scanned file named for the page's Lua export.",
    },
    {
      invariantKind: "departure",
      statement: "A scanned file no page names is taken from the scan unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A scanned file that is a page's own code file is taken from the page instead.",
    },
    {
      invariantKind: "departure",
      statement: "A build for Lua 5.0 takes a page's Lua 5.0 code where the page states that code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A build for Lua 5.0 names the code each page's Lua 5.0 code is taken in place of.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import naming the code of a page holding Lua 5.0 code names that page's feature.",
    },
    {
      invariantKind: "departure",
      statement: "A Lua export names its feature once the export's `__TS__` prefix is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A Lua export naming a feature outright names that feature.",
    },
    {
      invariantKind: "departure",
      statement: "A Lua export names its feature once the export's first letter is upper-cased.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no lualib feature either way refuses the build.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the page's path and the name the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A page's stated lua feature takes the place of the feature its Lua export names.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages naming one lualib feature refuse the build.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names both pages' paths and the feature the two name.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose code file is not there is passed over.",
    },
    {
      invariantKind: "gap",
      statement: "A page whose slug is no export name reads as nothing.",
    },
    {
      invariantKind: "gap",
      statement: "The code file of a page whose slug is no export name is named.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming a feature the scan found nowhere is added after the scanned files.",
    },
    {
      invariantKind: "departure",
      statement: "The pages say how a source file's name reaches a feature name.",
    },
    {
      invariantKind: "departure",
      statement: "No page at all answers with the scanned files themselves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here imports a page to read that page.",
    },
  ],
} as const satisfies Module
