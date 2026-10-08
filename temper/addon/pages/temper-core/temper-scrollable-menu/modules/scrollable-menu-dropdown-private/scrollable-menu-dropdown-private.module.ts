import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownPrivate = {
  id: "01a06275-c448-78fd-8436-b6770bf3e427",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-private",
  definition: "the private helper table of the dropdown class and its automatic-refresh triggers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The private table is registered on the library classes table under its own key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry can declare a data key that raises a refresh of itself and its parents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Parent rows are refreshed by walking the m_parentControl chain upward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon change fires a library callback even where no refresh follows.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.264Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
