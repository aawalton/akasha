import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsGenSetInfo = {
  id: "01a061fc-cee5-75d4-9e8c-3b140c7e89cc",
  type: "page-type/module",
  slug: "lib-sets-gen-set-info",
  definition: "the whole set info table gathered from its 12 set id range parts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The parts spread in ascending set id order so the whole has the ids in source order.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Nothing checks that the spread order still matches the ascending id order of the source.",
    },
  ],
  code: "ts",
} as const satisfies Module
