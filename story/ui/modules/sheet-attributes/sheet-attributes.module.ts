import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetAttributes = {
  id: "01a18303-9351-7ff9-a9a5-1a27defe5b24",
  type: "page-type/module",
  slug: "sheet-attributes",
  definition: "a character sheet's named numbers, drawn under the groups its world names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each group is a section titled as its world titles it, in the order handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section is the collapsible panel card Temper's completion page draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each row of a section is the stat row Temper's completion page draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every section is drawn open, and whether one is open is not kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading's space to its first row is the space between two rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section spans the panel it is drawn in rather than the width a panel card takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A group counting slots shows that count at the right of its title, in the accent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Attributes in no group are drawn under Attributes, after the groups.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each number has a row of its own, the name at the left and the value at the right of it.",
    },
  ],
  createdAt: "2026-10-28T14:56:52.048Z",
  updatedAt: "2026-10-28T22:00:47.729Z",
} as const satisfies Module
