import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  type: "module",
  slug: "rooting",
  definition: "the akasha checkout a file is in, found by walking up to its domain page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The root is the nearest folder at or above a path with the akasha domain page.",
    },
    {
      invariantKind: "departure",
      statement: "A root is found on the disk rather than read off the spelling of a path.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name says nothing about whether that folder is a root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path outside every `akasha` folder is refused rather than answered with a wrong root.",
    },
    {
      invariantKind: "departure",
      statement: "The name of the file marking a root is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "A root the environment states is the root over the one walked up to.",
    },
    {
      invariantKind: "departure",
      statement: "A root stated as nothing is no root stated.",
    },
    {
      invariantKind: "departure",
      statement: "The name the environment states a root under is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "A caller carrying its own fallback is answered the stated root or nothing.",
    },
  ],
} as const satisfies Module
