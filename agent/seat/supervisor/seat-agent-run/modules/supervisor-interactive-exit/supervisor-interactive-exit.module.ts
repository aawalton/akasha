import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveExit = {
  id: "01a18d7f-2c07-752f-a9e1-977270ee9dd7",
  type: "page-type/module",
  slug: "supervisor-interactive-exit",
  definition: "how a supervisor ends the last process of its agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The proxy is stopped at exit only where no re-exec is pending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last cleanup runs under a force-exit timer that is always disarmed.",
    },
  ],
  createdAt: "2026-10-30T15:48:04.230Z",
  updatedAt: "2026-10-30T15:48:04.230Z",
} as const satisfies Module
