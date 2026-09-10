import type { ChangeRunner } from "../../change-runner.page-type.types.ts"

export const agentChangeRunning = {
  id: "01a077c9-cb05-7a92-a69e-7d25da444d7e",
  pageTypeSlug: "change-runner",
  type: "change-runner",
  slug: "agent-change-running",
  definition: "the runner holding an agent change to the arguments that change takes",
  code: "ts",
  addressed: "ts",
  reached: "page-type/change-agent",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An address written in code is held to the arguments the map states.",
    },
    {
      invariantKind: "departure",
      statement: "An address worked out while a command runs is held to the change's refusals.",
    },
    {
      invariantKind: "departure",
      statement: "The change is loaded and run by the module both runners reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to a generated file's content is refused whatever guards the change names.",
    },
    {
      invariantKind: "absence",
      statement: "No change is imported here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is proven by a test, as nothing here runs that a type does not say.",
    },
  ],
} as const satisfies ChangeRunner
