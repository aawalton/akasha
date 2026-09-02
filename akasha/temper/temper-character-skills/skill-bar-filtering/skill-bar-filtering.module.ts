import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillBarFiltering = {
  id: "01a06187-b3a3-78c4-bc72-3cc3411efc24",
  pageTypeSlug: "module",
  slug: "skill-bar-filtering",
  definition: "the skills a character may put on one bar, given what it wears and what it is",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A weapon or armour line offers skills only while that line is available.",
    },
    {
      invariantKind: "constraint",
      statement: "The werewolf line offers ultimates alone.",
    },
  ],
} as const satisfies Module
