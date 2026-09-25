import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageSupervisorClaimedReconcile = {
  id: "01a0683e-3dbe-7011-964e-6ba8498d44b5",
  type: "page-type/module",
  slug: "agent-message-supervisor-claimed-reconcile",
  definition: "messages a seat claimed and ended without consuming, released again",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim held because its message reached the seat is taken rather than left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take refused here is said, and its claim stays for the next resume.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the transcript shows was injected is held rather than released.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message marked shown is held however far back in the transcript its injection sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Redelivery waits for its window before anything is read as unconsumed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reconcile that faults does not stop the resume that reconcile runs under.",
    },
  ],
} as const satisfies Module
