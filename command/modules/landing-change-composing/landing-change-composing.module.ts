import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingChangeComposing = {
  id: "01a08e4b-4473-76f8-a0ab-a6f11802d8b6",
  type: "page-type/module",
  slug: "landing-change-composing",
  definition: "the change a set of file changes makes against the repository",
  code: "ts",
  test: "ts",
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
      statement: "A row bringing a body from outside takes that body off the path it names.",
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing folds its rows for a page's referenced-by file into the rows that file holds on the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing folds a shapes row into the rows the tree holds, by the page property that row is for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing folds a schema row into the rows the tree holds, by the key that row states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing folds a domain row into the rows its picture is drawn from, by the whole row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fold reaches a path the repository ignores as it reaches a committed one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body a fold weighs its rows against is the first a row for that path names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fold weighs a path the tree holds no body at against no rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing taking such a file away folds that removal in as it folds an edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fold leaving no row takes the file away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beside file a move carries is folded into the rows the tree holds where that move carries from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder move leaves a page every referenced-by row an importer outside that folder files.",
    },
  ],
} as const satisfies Module
