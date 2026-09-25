import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entryRewriting = {
  id: "01a0d506-39ae-7667-bdf3-3701862ee4a6",
  type: "page-type/module",
  slug: "entry-rewriting",
  definition: "the entries beside every page of a page type, written anew one page at a time",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type and the key its pages keep entries beside them under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key keeping no entries beside the page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key whose property is of any kind under `page-property-entry` keeps entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file of entries beside a page is written, each part of it included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What each file's entries become is worked out by the change handing this in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose entries need no edit is not counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One file refused refuses the whole run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value in a page's own body is written.",
    },
  ],
} as const satisfies Module
