import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimLongPressDrag = {
  id: "01a0685d-ceae-7008-b721-3b37d87dca97",
  type: "command",
  slug: "mobile-sim-long-press-drag",
  definition: "the command holding a finger down on the simulator and dragging it somewhere",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--x <px>", takes: "how far across the viewport the finger goes down" },
    { said: "--y <px>", takes: "how far down the viewport the finger goes down" },
    { said: "--to-x <px>", takes: "how far across the viewport the finger ends" },
    { said: "--to-y <px>", takes: "how far down the viewport the finger ends" },
    {
      said: "--hold-ms <ms>",
      takes: "how long the finger holds before it drags, 800 where none is said",
    },
    { said: "--steps <n>", takes: "how many moves the drag is made of, 12 where none is said" },
    { said: "--step-ms <ms>", takes: "how long each move takes, 30 where none is said" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A gesture names where the finger goes down and where that finger ends.",
    },
    {
      invariantKind: "departure",
      statement: "A hold comes before a drag.",
    },
    {
      invariantKind: "departure",
      statement: "A drag is made of moves rather than of one jump.",
    },
    {
      invariantKind: "departure",
      statement: "A drag ending where that drag began is a gesture rather than nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "long-press-drag",
} as const satisfies Command
