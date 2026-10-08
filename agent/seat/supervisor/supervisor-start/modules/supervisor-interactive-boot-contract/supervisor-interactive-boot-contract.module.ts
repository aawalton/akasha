import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveBootContract = {
  id: "01a06871-3115-7004-85f9-3b541e6a385e",
  type: "page-type/module",
  slug: "supervisor-interactive-boot-contract",
  definition: "what a seat's interactive boot is asked for and what it hands back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has behaviour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every export is a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The boot's answer names the credential subsystem's parts rather than the subsystem.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "A new thing the boot returns is stated here before the boot returns that thing.",
    },
  ],
  createdAt: "2026-09-03T18:04:03.733Z",
  updatedAt: "2026-09-24T16:29:57.000Z",
} as const satisfies Module
