import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanHarnessAgentAnnoyance = {
  id: "01a0658a-e55d-7c76-83d2-3bedf4c9011c",
  type: "page-type/domain",
  slug: "alan-harness-agent-annoyance",
  definition: "what an agent does that annoys Alan",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A long message from an agent annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Alan does not read a long message.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that asks Alan for more than one thing annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that says the agent will act and then does not annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that says the agent is acting while not acting annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that stops before the work is done for no good reason annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that asks whether Alan wants to stop while work remains annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An agent that waits for a file to be free instead of starting work annoys Alan.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: 'An agent that uses the word "stands" annoys Alan.',
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Answering Alan is reason enough to stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Asking Alan is reason enough to stop.",
    },
  ],
} as const satisfies Domain
