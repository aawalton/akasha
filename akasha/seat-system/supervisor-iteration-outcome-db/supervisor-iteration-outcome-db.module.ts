import type { Module } from "@akasha/code-system/module"

export const supervisorIterationOutcomeDb = {
  id: "01a06838-5a84-7001-a522-1f0b3c183f21",
  pageTypeSlug: "module",
  slug: "supervisor-iteration-outcome-db",
  definition: "a call the supervisor gives up waiting on rather than waits out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call that has not answered in five seconds is at fault rather than still waiting.",
    },
    {
      invariantKind: "departure",
      statement: "The fault names the call and the wait the call outlived.",
    },
    {
      invariantKind: "departure",
      statement: "The timer is unrefed, so a call being waited on never holds the process open.",
    },
    {
      invariantKind: "departure",
      statement: "The timer is cleared whether the call answered or threw.",
    },
    {
      invariantKind: "departure",
      statement: "A call that answers after the wait ran out is dropped rather than raced back in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a database; only the wait is bounded.",
    },
  ],
} as const satisfies Module
