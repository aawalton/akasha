import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const devServerStating = {
  id: "01a06583-0030-7004-8711-a9cd6a8dbe3b",
  type: "page-type/module",
  slug: "dev-server-stating",
  definition: "the apps a dev server runs, and what a running one keeps on disk about itself",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The apps are the web app pages the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal naming the app flag is answered with the apps there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal naming no app flag is answered as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app no web app page is slugged for is a caller's mistake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No dev server starts for a web app stating no base port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A port is the first free port up from the app's base port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state file is written readable by its owner alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state file with a field the shape does not name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory that is not there yields no state rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a folder named by a whole commit hash holds dev server state.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a dev server.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A refusal naming the app flag is enriched from the index, so a bad flag reads as a missing index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No dev server starts where the hundred ports from the base port are all taken.",
    },
  ],
} as const satisfies Module
