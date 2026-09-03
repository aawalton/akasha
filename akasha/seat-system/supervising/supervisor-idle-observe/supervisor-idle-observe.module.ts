import type { Module } from "@akasha/code-system/module"

export const supervisorIdleObserve = {
  id: "01a06871-3115-7002-a786-a3fb7a53c159",
  pageTypeSlug: "module",
  slug: "supervisor-idle-observe",
  definition: "what a seat's proxy, process tree and dispatch children show at this moment",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The in-flight fetch gives up after one second.",
    },
    {
      invariantKind: "departure",
      statement: "A refused, failed or unparsed in-flight read is null, never zero.",
    },
    {
      invariantKind: "departure",
      statement: "A child whose cmdline cannot be read counts as busy.",
    },
    {
      invariantKind: "departure",
      statement: "Child pids come from the children file of every thread under the Claude pid.",
    },
    {
      invariantKind: "departure",
      statement: "The rule is asked once for all cmdlines, and answers are read back by position.",
    },
    {
      invariantKind: "departure",
      statement: "A Claude pid with no /proc entry reads as absent with null busy children.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dispatch child counts only where its principal is this agent and it is not absent.",
    },
    {
      invariantKind: "departure",
      statement: "A busy child's age is now less the mtime of its /proc directory, or null.",
    },
    {
      invariantKind: "departure",
      statement: "Seat ids come from the akasha seat list, and no page is opened for one.",
    },
  ],
} as const satisfies Module
