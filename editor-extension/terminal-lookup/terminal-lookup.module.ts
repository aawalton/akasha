import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalLookup = {
  id: "01a064e4-627c-7dcd-9bdb-3870ddce4d21",
  pageTypeSlug: "module",
  slug: "terminal-lookup",
  definition: "the seat name a shell reaches through the tmux client running under that shell",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shell's seat is the tmux session of the tmux client running under that shell.",
    },
    {
      invariantKind: "departure",
      statement:
        "A client runs under a shell where the parent chain from that client reaches the shell.",
    },
    {
      invariantKind: "departure",
      statement: "The parent chain is walked twenty hops at most.",
    },
    {
      invariantKind: "departure",
      statement: "A session that is no seat name is no seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lookup given no tmux client answers with no seat before reading a parent chain.",
    },
    {
      invariantKind: "departure",
      statement: "A command name may hold spaces so a process row is parted at two spaces alone.",
    },
    {
      invariantKind: "departure",
      statement: "A process row whose pid or parent pid is no finite number is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A tmux row whose session is empty is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A `ps` call that fails answers with no process rows.",
    },
    {
      invariantKind: "departure",
      statement: "A `tmux` call that fails answers with no clients.",
    },
    {
      invariantKind: "departure",
      statement: "A `ps` or `tmux` call is given five seconds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which seats exist.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which shell a terminal runs.",
    },
  ],
} as const satisfies Module
