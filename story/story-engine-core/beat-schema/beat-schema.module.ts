import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const beatSchema = {
  id: "01a05b71-e543-7506-a57c-cc05b4aa56aa",
  pageTypeSlug: "module",
  slug: "beat-schema",
  definition: "one entry in a game's log, either narrated prose or a system event",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A beat is known by its id where it has one and by its content where it does not.",
    },
    {
      invariantKind: "departure",
      statement: "A beat written to the log carries the turn the beat belongs to.",
    },
  ],
} as const satisfies Module
