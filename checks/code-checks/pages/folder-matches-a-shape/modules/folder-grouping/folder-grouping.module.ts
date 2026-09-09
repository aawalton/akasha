import type { Module } from "@akasha/code/module"

export const folderGrouping = {
  id: "01a076d1-2008-7e68-acfc-f5b939d07cc3",
  pageTypeSlug: "module",
  type: "module",
  slug: "folder-grouping",
  definition: "the folders a path sits under, and what a change leaves sitting in a folder",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folders above a path are answered from the nearest folder outward.",
    },
    {
      invariantKind: "departure",
      statement: "A folder an importer sits inside is no folder that import reaches into.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is asked of the index one folder at a time.",
    },
    {
      invariantKind: "absence",
      statement: "No answer here reads every path the index files.",
    },
    {
      invariantKind: "departure",
      statement: "The files in a folder are the index's answer joined to the paths a change adds.",
    },
    {
      invariantKind: "departure",
      statement: "A path a change takes away is dropped from the folder that path sat in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a change opens is answered under the folder above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a change empties is dropped by the index rather than dropped here.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is held for the folder that answer was asked about.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a folder.",
    },
    {
      invariantKind: "departure",
      statement: "Each folder a declared file name sits under is a segment of that name.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is such a segment only where the file that name gives sits under it.",
    },
  ],
} as const satisfies Module
