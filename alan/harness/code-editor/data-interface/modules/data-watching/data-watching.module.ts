import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataWatching = {
  id: "01a07266-d474-7296-bd8e-10c7667fe6b6",
  type: "page-type/module",
  slug: "data-watching",
  definition: "the loop holding what the editor draws and writing it where the editor reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every picture is worked out once as the service starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is worked out again only when a file the picture is made from changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is in memory between one change and the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is written under the cooldown its own page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The folders holding seat, subagent and initiative pages are read one folder down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file further down than that is no file a picture is made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file below any other folder a picture reads is no file that picture is made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders every picture reads are watched once rather than once per picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture states the folders that picture reads and the files there the picture is made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture states which of those folders are read one folder down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat, subagent or initiative page a picture is made from is any page of that type in its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's sidecar of uncommitted values is a file a picture is made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The folder holding a page type's pages is found beside where the index files that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those folders are read to find which of their pages exist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn-state pages a picture is made from are the pages the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a turn-state page is read because the index names that page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No other folder here is walked to find which pages exist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture states the page types that picture draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is taken again where the index files the slugs of one of those types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page coming into being, going, or being renamed is what writes there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a page type's slugs are filed is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those folders are followed one picture at a time rather than across pictures.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder the repository leaves untracked is followed for such an event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that appears while the service runs is read from then on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders a picture reads are worked out as the service starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages in a folder read one folder down are found again at each change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that could not be taken answers no line rather than an empty line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No file is written for a picture answering no line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line left on disk from before the service started is the line kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw ends the service rather than being caught and logged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No picture here is taken on a beat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No picture here is made from committed pages alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit watcher holds its own pictures in this loop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture landing on disk is where the service leaves for code that moved.",
    },
  ],
} as const satisfies Module
