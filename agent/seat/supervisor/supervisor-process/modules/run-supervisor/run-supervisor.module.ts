import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runSupervisor = {
  id: "01a069c8-f654-7d87-acd6-65d71f1132ff",
  type: "page-type/module",
  slug: "run-supervisor",
  definition:
    "the program a seat's supervisor is launched as, wiring the live session watch and rebind into it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's own scope is opened before that seat's supervisor starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose scope was opened before is opened again by doing nothing.",
    },
  ],
} as const satisfies Module
