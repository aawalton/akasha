import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIterationOutcomeDb = {
  id: "01a06838-5a84-7001-a522-1f0b3c183f21",
  type: "page-type/module",
  slug: "supervisor-iteration-outcome-db",
  definition: "a call the supervisor gives up waiting on rather than waits out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller states the wait a call is given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller stating no wait gives that call five seconds, and a call past its wait is at fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fault names the call and the wait the call outlived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timer is unrefed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call being waited on never has the process open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timer is cleared whether the call answered or threw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that answers after the wait ran out is dropped rather than raced back in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a database.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only the wait is bounded.",
    },
  ],
} as const satisfies Module
