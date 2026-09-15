import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  type: "module",
  slug: "rooting",
  definition: "the akasha checkout a file is in, found by walking up to its domain page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The root is the nearest folder at or above a path with the akasha domain page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root is found on the disk rather than read off the spelling of a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder's name says nothing about whether that folder is a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path outside every `akasha` folder is refused rather than answered with a wrong root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name of the file marking a root is said here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root the environment states is the root over the one walked up to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root stated as nothing is no root stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name the environment states a root under is said here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller carrying its own fallback is answered the stated root or nothing.",
    },
  ],
} as const satisfies Module
