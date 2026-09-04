import type { Module } from "@akasha/code-system/module"

export const supervisorIterationOutcomeHandlers = {
  id: "01a06871-3115-700b-b125-962ed5e09687",
  pageTypeSlug: "module",
  slug: "supervisor-iteration-outcome-handlers",
  definition: "what a restart-now action asks of the loop once the child has gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The restart notice is asked for before the requested action is cleared.",
    },
    {
      invariantKind: "departure",
      statement:
        "Clearing the requested action is tried twice, and both failures are logged and swallowed.",
    },
    {
      invariantKind: "departure",
      statement: "Each clear attempt is capped at five seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A pending re-exec turns restart-now into a break, and no resume is set.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rail route resumes with an empty first prompt; only spawn-argv carries the notice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rail route sets the driver to deferred-notice, and anything else to argv-prompt.",
    },
    {
      invariantKind: "departure",
      statement: "A clear that never lands still resumes the session.",
    },
  ],
} as const satisfies Module
