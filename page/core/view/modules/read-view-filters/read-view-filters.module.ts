import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readViewFilters = {
  id: "01a0e992-fa59-7d40-b154-8acbd74ad8af",
  type: "page-type/module",
  slug: "read-view-filters",
  definition: "the filters a view states, read against the properties of the pages tested",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow value is read as the type the property it tests holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow value that type cannot hold is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrow reaching through a relation becomes a narrow naming every related page that passes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A related narrow no related page passes lets no page through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of a type extending the type a relation names is a related page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narrows wait while the properties they are read against are unread.",
    },
  ],
} as const satisfies Module
