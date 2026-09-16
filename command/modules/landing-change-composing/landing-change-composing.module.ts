import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingChangeComposing = {
  id: "01a08e4b-4473-76f8-a0ab-a6f11802d8b6",
  type: "page-type/module",
  slug: "landing-change-composing",
  definition: "the change a set of file changes makes against the repository",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's body is worked out from the row rather than handed in beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row appending is weighed against the body its path already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path many rows name is left one body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move is held apart from the rows leaving a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row bringing a body in takes that body off the tree as bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those bytes are never read as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body no row names is read from the base commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file or commits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row carried beside the judged rows leaves its body readable as a judged row's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a row's path is left out of the files the change is judged over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files carried into the run are those rows' paths and the judged ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a settle worked out is carried beside the commit that settle was worked out against.",
    },
  ],
} as const satisfies Module
