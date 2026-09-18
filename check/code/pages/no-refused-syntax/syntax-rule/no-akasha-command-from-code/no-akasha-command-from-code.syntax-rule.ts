import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noAkashaCommandFromCode = {
  id: "01a05a75-206d-71dc-87f5-7b633a8f8658",
  type: "page-type/syntax-rule",
  slug: "no-akasha-command-from-code",
  definition: "the rule refusing a call that runs the akasha command from inside akasha",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command's own name is refused in the program's place alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the runner starts a process by is a launching call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The program a runner is handed is the first word of the list that runner takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is judged by what that name spells rather than by where it was taken from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No path a launching call names is read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder is spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name bound to a literal at the top of the file is read as that literal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path built by joining is read through to the literals the path joins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string shown to a reader is not a call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test file is judged as every other file is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process a program starts to outlive its caller is not the call this rule refuses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No use of the command from code is kept as permitted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mark asks for a quoted word that is the command or ends in the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program's place is spelled as such a word, so no refusal is outside the mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder an import opens with carries a path after it, so the mark passes it.",
    },
  ],
} as const satisfies SyntaxRule
