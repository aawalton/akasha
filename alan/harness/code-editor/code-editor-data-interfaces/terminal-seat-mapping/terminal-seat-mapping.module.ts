import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const terminalSeatMapping = {
  id: "01a0727f-7a7b-7404-85f0-913fafdd2e3b",
  pageTypeSlug: "module",
  slug: "terminal-seat-mapping",
  definition: "the seat each terminal sits on, keyed by the pid of the shell that terminal runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shell's seat is the tmux session of the tmux client running under that shell.",
    },
    {
      invariantKind: "departure",
      statement: "A client runs under a shell where the parent chain from that client reaches it.",
    },
    {
      invariantKind: "departure",
      statement: "The parent chain is walked twenty hops at most.",
    },
    {
      invariantKind: "departure",
      statement: "A parent chain is read one pid at a time rather than by taking a process table.",
    },
    {
      invariantKind: "departure",
      statement: "A chain stops where it reaches the process that started every other.",
    },
    {
      invariantKind: "departure",
      statement: "A session that is no seat name is no seat.",
    },
    {
      invariantKind: "departure",
      statement: "A pid two seats both reach is given to neither.",
    },
    {
      invariantKind: "departure",
      statement: "A `tmux` call that failed answers nothing rather than answering no client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which seats exist.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a color.",
    },
  ],
} as const satisfies Module
