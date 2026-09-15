import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIterationOutcomeHandlers = {
  id: "01a06871-3115-700b-b125-962ed5e09687",
  type: "page-type/module",
  slug: "supervisor-iteration-outcome-handlers",
  definition: "what a restart-now action asks of the loop once the child has gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The restart notice is asked for before the requested action is cleared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Clearing the requested action is tried twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure to clear the requested action is logged and swallowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each clear attempt is capped at five seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pending re-exec turns restart-now into a break.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pending re-exec sets no resume.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rail route resumes with an empty first prompt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only spawn-argv has the notice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rail route sets the driver to deferred-notice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Any other route sets the driver to argv-prompt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clear that never lands still resumes the session.",
    },
  ],
} as const satisfies Module
