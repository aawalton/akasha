import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutBody = {
  id: "01a05e63-1c18-7baa-a113-890ebfb04463",
  type: "page-type/module",
  slug: "readout-body",
  definition: "the shape a readout takes over the network to the screen that shows the readout",
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
  createdAt: "2026-09-01T19:12:28.696Z",
  updatedAt: "2026-10-30T16:02:43.057Z",
} as const satisfies Module
