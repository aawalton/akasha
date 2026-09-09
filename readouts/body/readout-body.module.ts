import type { Module } from "@akasha/code/module"

export const readoutBody = {
  id: "01a05e63-1c18-7baa-a113-890ebfb04463",
  pageTypeSlug: "module",
  type: "module",
  slug: "readout-body",
  definition: "the shape a reading takes on the wire to the surface drawing it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The wire shape belongs to every readout rather than to the readout that first had that shape.",
    },
    {
      invariantKind: "departure",
      statement: "A surface drawing a reading is held to the keys named here and to no other key.",
    },
    {
      invariantKind: "stopgap",
      statement: "One reading is carried at the top of the body rather than under its own name.",
    },
    {
      invariantKind: "gap",
      statement: "A body has as many readings as the group drawing the readings holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a readout.",
    },
  ],
} as const satisfies Module
