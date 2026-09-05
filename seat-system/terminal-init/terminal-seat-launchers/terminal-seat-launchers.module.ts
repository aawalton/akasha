import type { Module } from "@akasha/code-system/module"

export const terminalSeatLaunchers = {
  id: "01a0680a-fa30-755d-8c2b-8b46724afdcd",
  pageTypeSlug: "module",
  slug: "terminal-seat-launchers",
  definition: "the shell starting a fresh seat or resuming one, attached in the terminal typed in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat comes up under tmux, so a terminal that quits leaves the seat working.",
    },
    {
      invariantKind: "departure",
      statement: "The launch is composed from the same recipe the program launching a seat uses.",
    },
    {
      invariantKind: "departure",
      statement: "A session is live only where it holds a pane that is not dead.",
    },
    {
      invariantKind: "departure",
      statement: "A session holding only a dead pane is stopped and started again.",
    },
    {
      invariantKind: "departure",
      statement: "A tmux server this socket does not reach stops the launch rather than stranding.",
    },
    {
      invariantKind: "departure",
      statement: "A resume attaches to a live session without asking anything to start it.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh seat stops whatever held its name before it starts.",
    },
    {
      invariantKind: "departure",
      statement: "A name held by a tmux session with no seat page is stopped as that session.",
    },
    {
      invariantKind: "departure",
      statement: "A stop refused for anything but a missing page stops the launch.",
    },
    {
      invariantKind: "departure",
      statement: "One word naming a persona no document stands for is split into a name.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming a person rather than a persona seats that person's handler.",
    },
    {
      invariantKind: "departure",
      statement: "A seat bound to no agent id is not launched.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's attributes are stated before its client comes up.",
    },
    {
      invariantKind: "departure",
      statement: "Starting a seat is asked of the akasha command by name.",
    },
  ],
} as const satisfies Module
