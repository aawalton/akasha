import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const captureError = {
  id: "01a05bd6-c529-7e1b-b455-c42e0f069da5",
  type: "module",
  slug: "capture-error",
  definition: "an error a client met, filed as a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture is filed as a page of the runtime-error page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture asks for the page filed under its fingerprint before writing anything.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture finding no page files a page with a count of 1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture finding a page raises that page's count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture finding a page moves the moment that error was last met.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture finding a page hands back the values the commit already has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture of an error already filed lands no commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture finding a page whose count was never read writes no count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is handed over as values rather than as a path and a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which values reach the commit is settled by the runtime-error page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No stack reaches a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nobody who met an error is named.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides whether an error is worth filing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A refusal from the pages is thrown rather than swallowed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Two captures of one error arriving together leave the count short.",
    },
  ],
} as const satisfies Module
