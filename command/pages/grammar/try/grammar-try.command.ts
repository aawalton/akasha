import type { Command } from "akasha/command/command.page-type.types.ts"

export const grammarTry = {
  id: "01a0d9ad-2987-7dcb-84b3-bcf0b24a1c3f",
  type: "page-type/command",
  slug: "grammar-try",
  definition:
    "the command parsing a wording in a page's lexicon, with words or a construction tried",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wording is parsed from the start the definition property names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wording is parsed in the lexicon of the page whose slug is said at `--scope`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each wording is said with how many ways the grammar writes it and its unspelt words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "More than one way is said as more than one rather than as a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words and constructions tried are put in before any wording is parsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word tried is put in every lexicon, whatever scope that lexicon is for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item of a construction is a part of speech where one has its slug, and a phrase kind otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part of speech or a phrase kind no page has is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a word or a construction is tried, every domain definition is parsed before and after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition is gained where it is written one way after and not before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition is lost where it is written one way before and not after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each definition gained or lost is said with its path and its text, and the counts follow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call trying nothing and naming no wording is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing tried here is written to a page.",
    },
  ],
  name: "try",
  arguments: [
    { argument: "argument/lexicon-scope", required: true },
    { argument: "argument/added-spelling", required: false, repeats: true },
    { argument: "argument/trial-construction", required: false, repeats: true },
    {
      argument: "argument/wording",
      required: false,
      repeats: true,
      saidAs: "word",
      oneOf: ["argument/added-spelling", "argument/trial-construction"],
    },
  ],
} as const satisfies Command
