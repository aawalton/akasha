import type { Command } from "akasha/command/command.page-type.types.ts"

export const grammarRefused = {
  id: "01a0d9aa-7c59-7f81-8e53-5337ff5bc90f",
  type: "page-type/command",
  slug: "grammar-refused",
  definition: "the command listing the domain definitions the grammar refuses",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The first line counts the definitions, those the grammar admits and those it refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition is admitted where the grammar writes it exactly one way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refused definitions are listed in the order of their paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each refused definition is listed with its path, its text and its unspelt words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unspelt word is one the lexicon for that page's slug has no spelling for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path said at `--within` is read as the opening of the paths listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a path is said at `--within`, the first line counts only the paths it opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition outside every path said at `--within` is not parsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--all` and `--first` are never said together.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "refused",
  arguments: [
    { argument: "argument/first", required: false },
    {
      argument: "argument/every-refused-definition",
      required: false,
      notWith: ["argument/first"],
    },
    { argument: "argument/within", required: false, repeats: true },
  ],
} as const satisfies Command
