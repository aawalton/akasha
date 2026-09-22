import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTerminalOpenLine = {
  id: "01a09c58-2398-7392-b878-1c1491cab780",
  type: "page-type/module",
  slug: "seat-terminal-open-line",
  definition: "the key opening a line in a seat's terminal, or ending that line's list",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The line the cursor sits on is read before the newline is sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That line is read off the pane of the tmux session the seat is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row read is the one tmux says the pane's cursor sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt row opens with two columns of the prompt's own marker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line is that row past those two columns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pane in copy mode answers no line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal holding no seat opens a line carrying nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line tmux does not answer opens a line carrying nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor is handed in rather than imported.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A line the prompt wrapped opens a line carrying that line's own prefix.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No tab reaches the prompt, so no indent read off it is a tab.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No key other than the one opening a line is read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sweeps the terminals for their seats.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The prompt drops a newline carried in a bracketed paste and joins what sits either side of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newline is escape then return, which is the key the prompt opens a line on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The newline and the prefix are sent as one write, so no gap is left between the two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A press on an item holding only its marker erases that marker rather than opening a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The erasure reaches from the cursor back to the end of the item's indent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The column the cursor sits at is read off the same pane line its row is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cursor sitting no further than the indent opens a line rather than erasing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The row tmux answers with has its trailing spacing trimmed off.",
    },
  ],
} as const satisfies Module
