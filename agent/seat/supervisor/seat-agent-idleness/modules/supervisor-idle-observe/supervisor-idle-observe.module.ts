import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIdleObserve = {
  id: "01a06871-3115-7002-a786-a3fb7a53c159",
  type: "page-type/module",
  slug: "supervisor-idle-observe",
  definition: "what a seat's gateway, process tree and dispatch children show at this moment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The in-flight fetch gives up after one second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that is refused or failed or unparsed is null rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child whose cmdline cannot be read counts as busy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Child pids come from the children file of every thread under the Claude pid.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A Claude pid with no /proc entry reads as absent with null busy children.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dispatch child counts only where its principal is this agent and that child is not absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A busy child's age is now less the mtime of its /proc directory or null.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Seat ids come from the akasha seat list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is opened for a seat id.",
    },
  ],
} as const satisfies Module
