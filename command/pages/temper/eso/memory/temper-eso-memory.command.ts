import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoMemory = {
  id: "01a15577-71b1-7066-b34c-431632baa614",
  type: "page-type/command",
  slug: "temper-eso-memory",
  definition: "the command finding and showing bytes in the running game's memory",
  code: "ts",
  parts: ["module/hks-table-reading", "module/eso-process-memory"],
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
      decisionKind: "decision-kind/departure",
      statement: "A word is found only where its address is a multiple of eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes are shown sixteen to a row, with the row's two words in hex beside them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each word shown that points into the game's memory is marked.",
    },
  ],
  name: "memory",
  maxWallSeconds: 600,
  arguments: [
    { argument: "argument/memory-text" },
    { argument: "argument/memory-word" },
    { argument: "argument/memory-address" },
    { argument: "argument/memory-table" },
    { argument: "argument/limit" },
  ],
  createdAt: "2026-10-19T18:40:53.679Z",
  updatedAt: "2026-10-19T18:55:52.343Z",
} as const satisfies Command
