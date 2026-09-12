import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatGrouping = {
  id: "01a09320-5e3c-7f72-9939-3532cd8aac0f",
  type: "module",
  slug: "seat-grouping",
  definition: "the group a seat's own processes sit in, apart from the runs that seat starts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's scope holds no process of its own once this has run.",
    },
    {
      invariantKind: "departure",
      statement: "Every process the scope held moves into one child of that scope.",
    },
    {
      invariantKind: "departure",
      statement: "Processor time and memory are turned on for that scope's children.",
    },
    {
      invariantKind: "departure",
      statement: "A run the seat starts is then made inside the seat rather than beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A group that is no seat's scope is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A scope opened already is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's scope is known by the name tmux gives it.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the controllers came on is read back rather than assumed.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose scope would not open works on as that seat did before.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends a process or reads what one spent.",
    },
  ],
} as const satisfies Module
