import type { Module } from "@akasha/code-system/module"

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
      statement: "The path a module loads from is worked out from the package name.",
    },
    {
      invariantKind: "departure",
      statement: "A name that resolves nowhere is kept as the path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The path a resolved name holds inside its own tree is taken under the root in play.",
    },
    {
      invariantKind: "departure",
      statement: "The checks are reached only to judge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change judged in a scratch tree is judged by the checks at this code's own root.",
    },
    {
      invariantKind: "departure",
      statement: "This file's own path is asked of whichever runtime is running it.",
    },
    {
      invariantKind: "departure",
      statement: "The root is read when a module is first loaded rather than at import.",
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
      statement: "What is handed back says only why the gate is missing.",
    },
    {
      invariantKind: "departure",
      statement: "The caller says what a missing gate means.",
    },
    {
      invariantKind: "departure",
      statement: "A gate nobody could build judges nothing rather than passing everything.",
    },
    {
      invariantKind: "departure",
      statement: "The gate is built for one phase.",
    },
    {
      invariantKind: "departure",
      statement: "Which checks stand on a phase is answered where the checks are.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here indexes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "absence",
      statement: "What is handed back is what will judge.",
    },
    {
      invariantKind: "absence",
      statement: "This module is never told whether it ran.",
    },
    {
      invariantKind: "gap",
      statement: "The checks a change alters are loaded as that change leaves those checks.",
    },
  ],
} as const satisfies Module
