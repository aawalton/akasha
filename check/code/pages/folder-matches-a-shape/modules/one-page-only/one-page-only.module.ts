import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const onePageOnly = {
  id: "01a09d18-8d7c-7838-a182-93dea1d06ca2",
  type: "page-type/module",
  slug: "one-page-only",
  definition: "what the shapes of a folder headed by one page all say alike",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with no page of its own is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with a page more than the one it answers for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which second page the folder answers for is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file in the folder that is no part of the page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files are parts is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named other than what its page calls it is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the folders under the folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what page type the page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder named its page's slug with the names of every page above taken off is right.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is taken off for every folder above holding a page rather than for the nearest alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder named the plural the page's own page type gathers its pages under is right.",
    },
  ],
} as const satisfies Module
