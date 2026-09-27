import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncController = {
  id: "01a05b69-4547-747b-9629-3663477b0241",
  type: "page-type/module",
  slug: "sync-controller",
  definition: "what carries page rows into the collection as they arrive",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row pushed before the collection syncs is held, and lands when it syncs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delete or a reset pushed before the collection syncs acts on what is held.",
    },
  ],
} as const satisfies Module
