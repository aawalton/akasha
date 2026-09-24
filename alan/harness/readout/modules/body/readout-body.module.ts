import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutBody = {
  id: "01a05e63-1c18-7baa-a113-890ebfb04463",
  type: "page-type/module",
  slug: "readout-body",
  definition: "the shape a reading takes on the wire to the surface drawing it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The wire shape belongs to every readout rather than to the readout that first had that shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surface drawing a reading is held to the keys named here and to no other key.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "One reading is carried at the top of the body rather than under its own name.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a readout.",
    },
  ],
} as const satisfies Module
