import type { Module } from "@akasha/code-system/module"

export const libSetsGenSetInfo = {
  id: "01a061fc-cee5-75d4-9e8c-3b140c7e89cc",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-set-info",
  definition: "The whole LibSets SET_INFO table gathered from its 12 set id range parts.",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The parts spread in ascending set id order so the whole holds the ids in source order.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing checks that the spread order still matches the ascending id order of the source.",
    },
  ],
  code: "ts",
} as const satisfies Module
