import type { Command } from "akasha/command/command.page-type.types.ts"

export const search = {
  id: "01a0d95d-0562-7b37-8da6-b545f0c738bc",
  type: "page-type/command",
  slug: "search",
  definition: "the command returning each line of this repository a pattern matches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A search runs ripgrep over the whole repository or over each path it is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a search is named is said from the repository root, and lands inside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search passes over what git ignores, what is hidden, and the `.git` folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path named outright is searched whether git ignores it or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each line shown carries its line number, and the lines of a file follow its path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line matched is marked `:` and a line shown around it is marked `-`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line longer than 400 characters is cut, and says how much was cut.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files come back in the order of their paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No call returns more than the bytes one answer of a read holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search past those bytes stops there and says how to narrow it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files a search reaches first is not fixed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each file a search showed lines of is recorded as seen in part, with its body's id and lines shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part seen is kept in the read record, and is no read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write to a file seen in part still owes a read of that whole file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--files-only` shows no line, so that search records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A search showing lines whose output is thrown away returns nothing and records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A search showing only paths may be thrown away or piped, since it records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search showing lines for an agent nothing identifies is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search showing lines waits for the agent's page as a read does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search leaves out lore the world builder holds for a game master's seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search says how many files of lore it left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern ripgrep will not read is a fault of the input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search nothing matched says so and is no fault.",
    },
  ],
  name: "search",
  arguments: [
    { argument: "argument/pattern", required: true, saidAs: "flag-or-word" },
    { argument: "argument/within", repeats: true },
    { argument: "argument/glob", repeats: true },
    { argument: "argument/file-type", repeats: true },
    { argument: "argument/context-lines" },
    { argument: "argument/files-only" },
    { argument: "argument/ignore-case" },
  ],
} as const satisfies Command
