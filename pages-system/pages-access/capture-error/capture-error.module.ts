import type { Module } from "@akasha/code-system/module"

export const captureError = {
  id: "01a05bd6-c529-7e1b-b455-c42e0f069da5",
  pageTypeSlug: "module",
  slug: "capture-error",
  definition: "an error a client met, filed as a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capture is filed as a page of the error page type.",
    },
    {
      invariantKind: "departure",
      statement: "A capture asks what is filed under its fingerprint before writing anything.",
    },
    {
      invariantKind: "departure",
      statement: "A capture finding no page files one carrying a count of one.",
    },
    {
      invariantKind: "departure",
      statement: "A capture finding a page raises that page's count.",
    },
    {
      invariantKind: "departure",
      statement: "A capture finding a page moves the moment that error was last met.",
    },
    {
      invariantKind: "departure",
      statement: "A capture finding a page hands back the values the commit already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A capture of an error already filed lands no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A capture finding a page whose count was never read writes no count.",
    },
    {
      invariantKind: "departure",
      statement: "A page is handed over as values rather than as a path and a body.",
    },
    {
      invariantKind: "departure",
      statement: "Which values reach the commit is settled by the error page type.",
    },
    {
      invariantKind: "absence",
      statement: "No stack reaches a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nobody who met an error is named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether an error is worth filing.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal from the pages is thrown rather than swallowed.",
    },
    {
      invariantKind: "gap",
      statement: "Two captures of one error arriving together leave the count short.",
    },
  ],
} as const satisfies Module
