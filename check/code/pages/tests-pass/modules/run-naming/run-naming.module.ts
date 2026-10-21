import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runNaming = {
  id: "01a0b7c9-d8d8-78e8-bb82-9ac8ee8f4e4b",
  type: "page-type/module",
  slug: "run-naming",
  definition: "what a change names for the test run that change needs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A changed file is asked for the tests beside it by name rather than by listing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the change answers no body for is left out of the names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed test fixture names the tests beside each file importing that fixture as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A test fixture is a file a `test-fixtures` property holds, or the code of a test-fixture page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The importers of a test fixture are read from the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed file names each test importing it at any depth, of whatever page that test is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That reach is followed through every importer but one importing types alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed page, or a file beside one, names the test of each module reading its type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module reads a page type its page names among the types its test reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file no page is named by is of each page type carrying a file property naming that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those modules are read from the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A changed file that is no test fixture names a test importing it, and no other importer's test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is answered once however many changed files name it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are answered sorted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest is read for the name its package is reached under and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That name is answered against the folder the link would sit in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a test, reads a run or writes a body.",
    },
  ],
  createdAt: "2026-09-19T03:50:53.912Z",
  updatedAt: "2026-10-21T13:55:35.230Z",
} as const satisfies Module
