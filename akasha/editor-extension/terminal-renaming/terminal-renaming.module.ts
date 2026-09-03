import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalRenaming = {
  id: "01a06811-01d3-7008-a808-17b815c1fd1f",
  pageTypeSlug: "module",
  slug: "terminal-renaming",
  definition: "the sweep that names every terminal for its seat, and what sets one going",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One sweep runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A trigger arriving mid-sweep waits for the sweep in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A poll, a seat file, a seat page, a terminal event or a command starts a sweep.",
    },
    {
      invariantKind: "departure",
      statement: "A window holding no terminal is swept over nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A ps snapshot answering nothing ends the sweep.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep records what it read of the terminals and how long it waited.",
    },
    {
      invariantKind: "departure",
      statement: "Turn colors that cannot be read leave every tab the color it has.",
    },
    {
      invariantKind: "departure",
      statement: "A closed terminal's marks are dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep's outcome is recorded as an observation.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that fails is said on the channel and recorded as failed.",
    },
  ],
} as const satisfies Module
