import type { Module } from "@akasha/code-system/module"

export const dataEncodeDictionary = {
  id: "01a06061-969f-7e3e-b218-3d402a626bde",
  pageTypeSlug: "module",
  slug: "data-encode-dictionary",
  definition: "the repeated values of a table gathered so each is written out once",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value already in the global dictionary is left out of the local one.",
    },
    {
      invariantKind: "departure",
      statement: "A value is counted only from the third time that value is met.",
    },
    {
      invariantKind: "departure",
      statement: "A whole number between zero and one hundred is too short to be worth an index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A string or a number of two characters or fewer is too short to be worth an index.",
    },
    {
      invariantKind: "departure",
      statement:
        "The dictionary is ordered from the value met most often down to the value met least.",
    },
    {
      invariantKind: "departure",
      statement: "A key of an array is skipped rather than counted.",
    },
  ],
} as const satisfies Module
