import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorBootPrompt = {
  id: "01a0683e-3dbe-700c-846f-2de44a594e21",
  type: "page-type/module",
  slug: "supervisor-boot-prompt",
  definition: "the authored prompt a spawning seat is handed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no agent id spawns with no authored prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A composing that throws is caught and the seat spawns without a prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A composition that came back empty spawns with no authored prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt is renamed into place so no half-written file is ever handed over.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-09-24T16:29:57.000Z",
} as const satisfies Module
