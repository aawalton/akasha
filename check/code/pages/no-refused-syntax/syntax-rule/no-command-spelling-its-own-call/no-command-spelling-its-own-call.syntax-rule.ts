import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noCommandSpellingItsOwnCall = {
  id: "01a0944a-77a3-732c-91c2-0b714c12abf3",
  type: "syntax-rule",
  slug: "no-command-spelling-its-own-call",
  definition:
    "the rule refusing a command's own call spelled in a literal in that command's code or page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command's call is the folders under `command/pages` the file sits in, a space for each slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word a hyphen joins is refused spoken with a space in that hyphen's place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another command's call is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The word `akasha` naming the repository is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece of a template literal is judged as a whole string literal is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command's code and a command's page are both judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a directive on that page says is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test beside that code hands the call rather than spelling it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file outside `command/pages` is refused nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
