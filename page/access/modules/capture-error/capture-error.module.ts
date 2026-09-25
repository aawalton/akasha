import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const captureError = {
  id: "01a05bd6-c529-7e1b-b455-c42e0f069da5",
  type: "page-type/module",
  slug: "capture-error",
  definition: "an error a client met, filed as a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture is filed as a page of the runtime-error page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture asks for the page filed under its fingerprint before writing anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capture finding a page raises that page's count by 1 through `incrementProperty`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capture moves the moment that error was last met in the step raising the count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capture finding no page files a page as new, holding no count, and then counts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page filed as new refused because the page is there already is counted there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture of an error already filed lands no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture finding a page holding no count counts from 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is handed over as values rather than as a path and a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which values reach the commit is settled by the runtime-error page type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stack reaches a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nobody who met an error is named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides whether an error is worth filing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal from the pages is thrown rather than swallowed.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Two captures of one error arriving together leave the count short.",
    },
  ],
} as const satisfies Module
