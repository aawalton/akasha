import type { Command } from "akasha/command/command.page-type.types.ts"

export const grammarWords = {
  id: "01a0d9ab-8149-71e3-a2f7-7948474b5577",
  type: "page-type/command",
  slug: "grammar-words",
  definition: "the command saying the parts of speech each word has in a page's lexicon",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lexicon is the one the grammar reads for the page whose slug is said at `--scope`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no scope reaches is read in the global words alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each word is one line, with its parts of speech in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word the lexicon has no spelling for is said to have none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word is matched as written, so a word with a capital is a word of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "words",
  arguments: [
    { argument: "argument/lexicon-scope", required: true },
    { argument: "argument/lexicon-word", required: true, repeats: true, saidAs: "word" },
  ],
} as const satisfies Command
