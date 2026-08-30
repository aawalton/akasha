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
      statement:
        "A module is loaded by path through a require made here and imported nowhere, so what loading it costs is paid by whoever asks for it and by nobody else.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks are reached only to judge, so reaching a command never asks them to load.",
    },
    {
      invariantKind: "departure",
      statement:
        "The path is read from the root this code stands under, so a change judged in a scratch tree is judged by the checks standing here rather than by whatever stands there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module answering to less than a gate is built from is refused by name, so half a load is never taken for a whole one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gate that will not build is handed back as broken rather than thrown, so the caller says what a missing gate means and this says only why it is missing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gate nobody could build judges nothing rather than passing everything, so a caller reaching past a broken one never holds a gate that admits.",
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
