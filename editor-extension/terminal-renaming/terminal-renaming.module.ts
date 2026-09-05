import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalRenaming = {
  id: "01a06811-01d3-7008-a808-17b815c1fd1f",
  pageTypeSlug: "module",
  slug: "terminal-renaming",
  definition: "the naming that puts every terminal on its seat, and what sets one going",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat each terminal sits on is read from the file the service writes.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal is matched to a seat by the process id that terminal answers with.",
    },
    {
      invariantKind: "departure",
      statement: "One naming runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A trigger arriving mid-naming waits for the naming in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A write of that file, a terminal event or a command starts a naming.",
    },
    {
      invariantKind: "departure",
      statement: "A window holding no terminal is named over nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file not read yet leaves every terminal the name and color it has.",
    },
    {
      invariantKind: "departure",
      statement: "A naming records what it read of the terminals and how long it waited.",
    },
    {
      invariantKind: "departure",
      statement: "A closed terminal's marks are dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The naming's outcome is recorded as an observation.",
    },
    {
      invariantKind: "departure",
      statement: "A naming that fails is said on the channel and recorded as failed.",
    },
    {
      invariantKind: "absence",
      statement: "No timer starts a naming.",
    },
    {
      invariantKind: "absence",
      statement: "No child process is started here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat, a process table or a tmux client.",
    },
  ],
} as const satisfies Module
