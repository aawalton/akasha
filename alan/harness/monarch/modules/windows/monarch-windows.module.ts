import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchWindows = {
  id: "01a18d86-ae40-751d-9de5-756bcf28e7e5",
  type: "page-type/module",
  slug: "monarch-windows",
  definition: "how code finds the first day a run over Monarch transactions reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trusted window is twelve months and the unattended window is seven days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is cut from a moment handed in rather than from the clock.",
    },
  ],
  createdAt: "2026-10-30T15:56:16.319Z",
  updatedAt: "2026-10-30T15:56:16.319Z",
} as const satisfies Module
