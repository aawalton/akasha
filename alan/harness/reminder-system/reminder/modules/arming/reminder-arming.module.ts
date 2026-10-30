import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reminderArming = {
  id: "01a18da6-d48a-7cc4-9ae6-8a7a6f246f47",
  type: "page-type/module",
  slug: "reminder-arming",
  definition: "how code keeps the next time a reminder is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "When a reminder next falls due is kept beside the page rather than in the commit.",
    },
  ],
  createdAt: "2026-10-30T16:31:23.274Z",
  updatedAt: "2026-10-30T16:31:23.274Z",
} as const satisfies Module
