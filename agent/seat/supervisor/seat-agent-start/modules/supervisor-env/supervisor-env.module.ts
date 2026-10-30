import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorEnv = {
  id: "01a0683e-3dbe-701f-84bf-56050a29afd2",
  type: "page-type/module",
  slug: "supervisor-env",
  definition: "how code makes the environment variables a Claude Code process starts with",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An inherited Claude session key is stripped rather than passed to the child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inherited Anthropic routing key is stripped rather than passed to the child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inherited tool timeout wins over the timeout the seat conditions state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Resume thresholds are handed only to a headless child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name the supervisor has that is neither of those keys reaches the child unchanged.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:49:07.266Z",
} as const satisfies Module
