import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const agentMechanicalChange = {
  id: "01a05df1-e262-72e3-8f24-d6e5e4ed122d",
  pageTypeSlug: "domain",
  slug: "agent-mechanical-change",
  definition: "a change an agent runs and an akasha command composes",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A change made by an akasha command stating `mechanical` true is agent-mechanical.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical command takes no body an agent composed.",
    },
    {
      invariantKind: "departure",
      statement: "An agent-mechanical change is judged by the checks.",
    },
    {
      invariantKind: "absence",
      statement: "An agent-mechanical change owes no reading.",
    },
    {
      invariantKind: "stopgap",
      statement: "No code reads the `mechanical` a command states.",
    },
    {
      invariantKind: "gap",
      statement: "A command that changes anything states whether it is mechanical.",
    },
  ],
} as const satisfies Domain
