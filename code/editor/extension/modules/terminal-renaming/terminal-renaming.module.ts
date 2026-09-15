import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalRenaming = {
  id: "01a06811-01d3-7008-a808-17b815c1fd1f",
  type: "module",
  slug: "terminal-renaming",
  definition: "the naming that puts every terminal on its seat, and what sets one going",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat each terminal sits on is read from the file the service writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal is matched to a seat by the process id that terminal answers with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One naming runs at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trigger arriving mid-naming is run once that naming ends rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write of that file or a terminal event or a command starts a naming.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window with no terminal is named over nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file not read yet leaves every terminal the name and color that terminal has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A naming records the terminals that naming read and how long that naming waited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A color's name is read through the palette before a terminal is given that color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A closed terminal's marks are dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The naming's outcome is recorded as an observation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A naming that fails is said on the channel and recorded as failed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No timer starts a naming.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No child process is started here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a seat or a process table or a tmux client.",
    },
  ],
} as const satisfies Module
