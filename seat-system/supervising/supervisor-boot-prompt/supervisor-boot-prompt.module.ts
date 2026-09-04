import type { Module } from "@akasha/code-system/module"

export const supervisorBootPrompt = {
  id: "01a0683e-3dbe-700c-846f-2de44a594e21",
  pageTypeSlug: "module",
  slug: "supervisor-boot-prompt",
  definition: "the authored prompt a spawning seat is handed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat with no agent id spawns with no authored prompt.",
    },
    {
      invariantKind: "departure",
      statement: "Composing past its ceiling is abandoned and the seat spawns without a prompt.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt is renamed into place so no half-written file is ever handed over.",
    },
  ],
} as const satisfies Module
