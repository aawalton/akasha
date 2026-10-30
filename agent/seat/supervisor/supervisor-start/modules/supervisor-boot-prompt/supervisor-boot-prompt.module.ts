import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorBootPrompt = {
  id: "01a0683e-3dbe-700c-846f-2de44a594e21",
  type: "page-type/module",
  slug: "supervisor-boot-prompt",
  definition: "how code writes the prompt a seat starts with",
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
  updatedAt: "2026-10-30T14:46:43.019Z",
} as const satisfies Module
