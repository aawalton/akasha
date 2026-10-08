import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatGatewayState = {
  id: "01a06949-b281-74be-8e33-ceb172d49567",
  type: "page-type/module",
  slug: "seat-gateway-state",
  definition: "how akasha keeps the model gateway a seat has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy is read back only where its process key parses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy whose port is not a number is not read back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy whose version is empty or absent is not read back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process key held as null reads the same as a key that is not there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is written where the agent has no seat name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pid whose start ticks will not read is written as a null process key.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-09-25T17:59:47.000Z",
} as const satisfies Module
