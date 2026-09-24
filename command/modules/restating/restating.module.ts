import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const restating = {
  id: "01a0725b-7254-78a0-805c-1e7767a3e280",
  type: "page-type/module",
  slug: "restating",
  definition: "whether a change moves only the words a page states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is restated where the text inside its quotes moves and nothing else does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text a template holds between its expressions is text inside quotes too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template inside a template's expression holds text inside quotes of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quote inside a comment or a pattern opens no text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each body is formatted before the two are compared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A longer run of text the formatter rewraps is a restatement even so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of text added or taken away is no restatement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a comment is no restatement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken away is no restatement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that is not there yet is no restatement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a TypeScript body is judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
