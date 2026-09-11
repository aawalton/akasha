import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const terminalSeatMarks = {
  id: "01a0785c-fa03-739c-823f-27b2ea6fc501",
  type: "module",
  slug: "terminal-seat-marks",
  definition: "the seat a terminal is attached to, stated by the shell attaching it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The shell attaching to a seat states that seat rather than a reader working the seat out.",
    },
    {
      invariantKind: "departure",
      statement: "A mark is beside the terminal's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A mark is named for its terminal as that terminal's page is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mark a shell wrote to attach is there from just before that attach until that attach returns.",
    },
    {
      invariantKind: "departure",
      statement: "A mark names the pid of the shell and the moment that shell started.",
    },
    {
      invariantKind: "departure",
      statement: "A mark whose pid started at another moment is a mark for a shell that is gone.",
    },
    {
      invariantKind: "departure",
      statement: "A shell that ended without clearing its mark leaves a mark reaching no terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh shell overwrites the mark left under the same pid.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that cannot be read answers nothing rather than answering no mark.",
    },
    {
      invariantKind: "departure",
      statement: "A seat named by a mark that is no seat name is no seat.",
    },
    {
      invariantKind: "departure",
      statement: "The line naming the checkout comes from the caller rather than from here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks tmux which client sits on which session.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks a parent chain.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which seats exist.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a color.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal the editor revived onto a seat states that seat as its shell starts.",
    },
    {
      invariantKind: "departure",
      statement: "The shell writing a mark and the shell attaching are told apart.",
    },
    {
      invariantKind: "gap",
      statement: "A mark a revived terminal wrote goes when that terminal's shell ends.",
    },
  ],
} as const satisfies Module
