import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoProcessMemory = {
  id: "01a15585-2818-76db-afbc-b04ac0ae663b",
  type: "page-type/module",
  slug: "eso-process-memory",
  definition: "the running game's process and the memory read out of it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the game or attaches to the game as a debugger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's memory is copied out by the kernel, so the game is never paused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only memory the game can write is searched.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only a process outside the agent's shell can read the game's memory.",
    },
  ],
  createdAt: "2026-10-19T18:55:52.343Z",
  updatedAt: "2026-10-19T18:55:52.343Z",
} as const satisfies Module
