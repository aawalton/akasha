import type { Module } from "../../code-system/module/module.page-type.ts"

export const gateBuilding = {
  id: "01a0531c-b3ec-7f09-a560-bb87dc11609d",
  pageTypeSlug: "module",
  slug: "gate-building",
  definition: "the checks and the index loaded by path when wanted, and the gate built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module is loaded by path through a require made here and imported nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The checks are reached only to judge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change judged in a scratch tree is judged by the checks standing at the root this code stands under, not by whatever stands in the scratch tree.",
    },
    {
      invariantKind: "departure",
      statement: "A module answering to less than a gate is built from is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A gate that will not build is handed back as broken rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement:
        "It says only why the gate is missing, and the caller says what a missing gate means.",
    },
    {
      invariantKind: "departure",
      statement: "A gate nobody could build judges nothing rather than passing everything.",
    },
    {
      invariantKind: "departure",
      statement:
        "The gate is built for one phase, and which checks stand on a phase is answered where the checks are.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges, writes, indexes or commits. What is handed back is what will judge, and this is never told whether it ran.",
    },
  ],
} as const satisfies Module
