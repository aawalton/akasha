import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentAttributes = {
  id: "01a06949-b281-754d-abc3-b81859567424",
  type: "page-type/module",
  slug: "agent-attributes",
  definition: "how code reads the attributes of the seat of an agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is taken from the seat page field named for the key plus -slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute whose value is empty or is not text is absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug written as an address is read as the bare slug that address names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page by id is answered as it was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent's own attributes are empty where no seat is named for that agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start mode that is neither interactive nor headless is no mode.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose start mode was never written is taken as headless.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-19T19:36:53.629Z",
} as const satisfies Module
