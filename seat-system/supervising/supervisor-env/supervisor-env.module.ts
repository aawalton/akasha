import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorEnv = {
  id: "01a0683e-3dbe-701f-84bf-56050a29afd2",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-env",
  definition: "the environment a supervisor hands its Claude child",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An inherited Claude session key is stripped rather than passed to the child.",
    },
    {
      invariantKind: "departure",
      statement: "An inherited Anthropic routing key is stripped rather than passed to the child.",
    },
    {
      invariantKind: "departure",
      statement: "An inherited tool timeout wins over the timeout the seat conditions state.",
    },
    {
      invariantKind: "departure",
      statement: "Resume thresholds are handed only to a headless child.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name the supervisor has that is neither of those keys reaches the child unchanged.",
    },
  ],
} as const satisfies Module
