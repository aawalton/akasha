import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureRepo = {
  id: "01a0796e-60aa-792a-9f56-2593355a10a6",
  type: "page-type/command",
  slug: "measure-repo",
  definition: "the command counting the files the checkout has, by file type",
  code: "ts",
  test: "ts",
  parts: ["module/repo-measuring"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines each file runs to are counted beside the files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file type is what follows the last dot in a name, and a name with no dot is its own type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked file and an untracked file the repository keeps are both counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total beneath the types counts what was counted rather than what git listed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A file a `generated`, `build`, `dist`, `out` or `coverage` folder holds is not counted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file the repository ignores is not counted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file is judged for being text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "repo",
  arguments: [],
} as const satisfies Command
