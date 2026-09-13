import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const folderSpelling = {
  id: "01a091d9-3205-7ee2-80c5-6583ff907541",
  type: "module",
  slug: "folder-spelling",
  definition: "a path-shaped string read against a folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string with no separator is a name rather than a path naming a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A string equal to a folder names that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A string carrying on from a folder at a separator names that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A string opening with a folder's letters but not at a separator names no folder.",
    },
    {
      invariantKind: "departure",
      statement: "The first folder named of the folders handed in is the folder answered.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming a folder that moved lands under the folder that folder moved to.",
    },
    {
      invariantKind: "departure",
      statement: "What the string spells after that folder is kept as the string spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming no folder that moved lands nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a string lands is read through what names the folder rather than beside it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a body or rewrites one.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a folder is there is not judged here.",
    },
  ],
} as const satisfies Module
