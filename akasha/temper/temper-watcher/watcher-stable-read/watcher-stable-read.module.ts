import type { Module } from "@akasha/code-system/module"

export const watcherStableRead = {
  id: "01a0635b-79f7-7b16-a5de-404b96e64447",
  pageTypeSlug: "module",
  slug: "watcher-stable-read",
  definition: "how the watcher waits for the game to finish writing a file before reading it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is judged settled by its size and its modification time together.",
    },
    {
      invariantKind: "departure",
      statement: "A file counts as settled only after enough looks agree in a row.",
    },
    {
      invariantKind: "departure",
      statement: "Fewer looks than are required is never enough.",
    },
    {
      invariantKind: "departure",
      statement: "A file that changed between the settled look and the read is looked at afresh.",
    },
    {
      invariantKind: "departure",
      statement: "A file that went away while being watched is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file still unsettled at the deadline is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A saved-variables file the game finished writing closes with a brace.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses what the file holds.",
    },
  ],
} as const satisfies Module
