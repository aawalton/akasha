import type { Domain } from "../../../../domain-system/domains/domain.page-type.ts"

export const alanHarnessAgentsAnnoyance = {
  id: "01a0658a-e55d-7c76-83d2-3bedf4c9011c",
  pageTypeSlug: "domain",
  slug: "alan-harness-agents-annoyance",
  definition: "what an agent does that annoys Alan",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A long message from an agent annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "Alan does not read a long message.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that asks Alan for more than one thing annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that says the agent will act and then does not annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that says the agent is acting while not acting annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that stops before the work is done for no good reason annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that asks whether Alan wants to stop while work remains annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: "An agent that waits for a file to be free instead of starting work annoys Alan.",
    },
    {
      invariantKind: "constraint",
      statement: 'An agent that uses the word "stands" annoys Alan.',
    },
    {
      invariantKind: "departure",
      statement: "Answering Alan is reason enough to stop.",
    },
    {
      invariantKind: "departure",
      statement: "Asking Alan is reason enough to stop.",
    },
  ],
} as const satisfies Domain
