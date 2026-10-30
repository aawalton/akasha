import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRebindCarry = {
  id: "01a06876-abda-7003-aa46-8cb6a02b10c3",
  type: "page-type/module",
  slug: "supervisor-rebind-carry",
  definition: "the name and attributes a seat gives the next agent in the seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A carried name that fails to bind is logged and the spawn goes on.",
    },
  ],
  createdAt: "2026-09-03T18:10:02.842Z",
  updatedAt: "2026-10-30T15:48:04.230Z",
} as const satisfies Module
