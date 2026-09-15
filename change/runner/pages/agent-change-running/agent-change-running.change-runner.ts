import type { ChangeRunner } from "akasha/change/runner/change-runner.page-type.types.ts"

export const agentChangeRunning = {
  id: "01a077c9-cb05-7a92-a69e-7d25da444d7e",
  type: "page-type/change-runner",
  slug: "agent-change-running",
  definition: "the runner holding an agent change to the arguments that change takes",
  code: "ts",
  addressed: "ts",
  reached: "page-type/change-agent",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address written in code is held to the arguments the map states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address worked out while a command runs is held to the change's refusals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is loaded and run by the module both runners reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a generated file's content is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change is imported here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is proven by a test.",
    },
  ],
} as const satisfies ChangeRunner
