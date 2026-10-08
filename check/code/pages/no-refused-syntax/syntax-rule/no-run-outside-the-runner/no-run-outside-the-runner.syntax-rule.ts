import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noRunOutsideTheRunner = {
  id: "01a05d68-4f2f-7e94-bbdd-0f8139dadfb7",
  type: "page-type/syntax-rule",
  slug: "no-run-outside-the-runner",
  definition: "the rule refusing a process run to its end anywhere but the runner",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is refused only where the name was taken from node's child process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`Bun.spawnSync` is refused wherever `Bun.spawnSync` is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name reached through a namespace taken from node's child process is refused too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process started to be awaited or held is not refused by this rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file in the runner's own folder is judged not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folder that is is the whole path that folder sits at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A method of that name reached on anything else is not a call to node's child process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No run outside the runner is kept as permitted.",
    },
  ],
  createdAt: "2026-09-01T14:38:32.239Z",
  updatedAt: "2026-09-15T19:09:55.000Z",
} as const satisfies SyntaxRule
