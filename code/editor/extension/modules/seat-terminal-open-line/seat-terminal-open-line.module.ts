import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatTerminalOpenLine = {
  id: "01a09c58-2398-7392-b878-1c1491cab780",
  type: "module",
  slug: "seat-terminal-open-line",
  definition: "the key opening a line in a seat's terminal, sent with the prefix it carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The line the cursor sits on is read before the newline is sent.",
    },
    {
      invariantKind: "departure",
      statement: "That line is read off the pane of the tmux session the seat is.",
    },
    {
      invariantKind: "departure",
      statement: "The row read is the one tmux says the pane's cursor sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt row opens with two columns of the prompt's own marker.",
    },
    {
      invariantKind: "departure",
      statement: "The line is that row past those two columns.",
    },
    {
      invariantKind: "departure",
      statement: "A pane in copy mode answers no line.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal holding no seat opens a line carrying nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A line tmux does not answer opens a line carrying nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The newline and the prefix are sent as one bracketed paste.",
    },
    {
      invariantKind: "departure",
      statement: "A bracketed paste arrives as one write, so no gap is left between the two.",
    },
    {
      invariantKind: "departure",
      statement: "The editor is handed in rather than imported.",
    },
    {
      invariantKind: "gap",
      statement: "A line the prompt wrapped opens a line carrying that line's own prefix.",
    },
    {
      invariantKind: "absence",
      statement: "No tab reaches the prompt, so no indent read off it is a tab.",
    },
    {
      invariantKind: "absence",
      statement: "No key other than the one opening a line is read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sweeps the terminals for their seats.",
    },
  ],
} as const satisfies Module
