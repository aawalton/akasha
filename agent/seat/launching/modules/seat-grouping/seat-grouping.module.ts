import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatGrouping = {
  id: "01a09320-5e3c-7f72-9939-3532cd8aac0f",
  type: "page-type/module",
  slug: "seat-grouping",
  definition: "the group a seat's own processes sit in, apart from the runs that seat starts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's scope holds no process of its own once this has run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every process the scope held moves into one child of that scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Processor time and memory are turned on for that scope's children.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run the seat starts is then made inside the seat rather than beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group that is no seat's scope is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope opened already is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's scope is known by the name tmux gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane's scope is found above the child a seat's processes moved into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the controllers came on is read back rather than assumed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose scope would not open works on as that seat did before.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends a process or reads what one spent.",
    },
  ],
} as const satisfies Module
