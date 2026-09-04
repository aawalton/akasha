import type { Command } from "@akasha/command-system/command"

export const mobileSimLongPressDrag = {
  id: "01a0685d-ceae-7008-b721-3b37d87dca97",
  pageTypeSlug: "command",
  slug: "mobile-sim-long-press-drag",
  definition: "the command holding a finger down on the simulator and dragging it somewhere",
  code: "ts",
  changeKindSlug: "change-none",
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
  helpNotes: [
    "the hold is what opens a long-press menu, and the drag is what reaches an item on it.",
    "a drag that ends where it began is still a drag, which is how a menu is opened and left open.",
    "the four coordinates are each required, since a gesture missing an end is no gesture.",
    "the session already standing is what is dragged in, so `mobile sim open-url` comes first.",
    "the drag is made of moves rather than of one jump, because one jump reads as a tap somewhere else.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gesture names where the finger goes down and where it ends.",
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
      statement: "A drag ending where it began is a gesture rather than nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
} as const satisfies Command
