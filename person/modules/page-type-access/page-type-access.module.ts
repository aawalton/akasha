import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeAccess = {
  id: "01a0c4ee-704e-775d-b32f-ddf8c29c7523",
  type: "page-type/module",
  slug: "page-type-access",
  definition: "whether a person may read or write a page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type opens only to a person with an access naming the page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access stating `all` names every page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an access of the page type kind opens a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access opens only the deed that access names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reader nobody signed in as holds the accesses that reader's own page is named by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grant is read from the access pages rather than compiled in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Access pages that went unread open nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decision carries why the decision refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here answers the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page type is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access carrying a narrow reaches the pages of its target holding that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access stating no narrow widens past every access that states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access carrying a narrow states the deed for reading some, and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gate that does not read a deed refuses the access stating it, so a narrow is never skipped.",
    },
  ],
} as const satisfies Module
