import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gateBuilding = {
  id: "01a0531c-b3ec-7f09-a560-bb87dc11609d",
  type: "module",
  slug: "gate-building",
  definition: "the checks and the index loaded by name when wanted, and the gate built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module is loaded by name through an import made here and named nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A module is loaded by awaiting it, so a module the loader serves is reached.",
    },
    {
      invariantKind: "departure",
      statement: "The name a module is loaded by is the name that module is imported by.",
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
      statement: "This file's own location is what the import made here resolves a name against.",
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
      statement: "The broken answer handed back says only why the gate is missing.",
    },
    {
      invariantKind: "departure",
      statement: "The caller says the meaning of a missing gate.",
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
      statement:
        "The phase a gate is built for is the caller's, and a caller naming none means the change.",
    },
    {
      invariantKind: "departure",
      statement: "Which checks sit on a phase is answered where the checks are.",
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
      statement: "Nothing here index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "absence",
      statement: "No root is worked out here.",
    },
    {
      invariantKind: "absence",
      statement: "The gate handed back is the gate that will judge.",
    },
    {
      invariantKind: "absence",
      statement: "This module is never told whether the gate ran.",
    },
    {
      invariantKind: "absence",
      statement:
        "`loadedBy` names a page type, and this loads two modules by name, so nothing declares it.",
    },
    {
      invariantKind: "gap",
      statement: "The checks a change alters are loaded as that change leaves those checks.",
    },
  ],
} as const satisfies Module
