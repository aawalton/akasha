import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const runSupervisor = {
  id: "01a069c8-f654-7d87-acd6-65d71f1132ff",
  type: "module",
  slug: "run-supervisor",
  definition:
    "the program a seat's supervisor is launched as, wiring the live session watch and rebind into it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's own scope is opened before that seat's supervisor starts.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose scope was opened before is opened again by doing nothing.",
    },
  ],
} as const satisfies Module
