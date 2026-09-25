import type { Index } from "akasha/page/index/index.page-type.types.ts"

export const indexAstHash = {
  id: "01a0c56b-23bc-7efc-8faa-12ffc3561594",
  type: "page-type/index",
  slug: "index-ast-hash",
  definition: "an index from what a function says to every file whose function says it",
  name: "ast-hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is filed under the key its rule condenses to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file here has one line for each function whose rule answers that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names the file the function is in and the name that function is bound to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two files spelling one rule are two lines under one key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is filed under its last two characters, as an id is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function only passing names along is filed nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body built only out of literals is filed nowhere either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This index files the code beside a page rather than the page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file the compiler reads as anything but TypeScript is filed nowhere here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Which of two files holding one rule should keep it is not said here.",
    },
  ],
} as const satisfies Index
