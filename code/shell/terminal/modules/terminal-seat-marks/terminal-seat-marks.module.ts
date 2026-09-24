import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalSeatMarks = {
  id: "01a0785c-fa03-739c-823f-27b2ea6fc501",
  type: "page-type/module",
  slug: "terminal-seat-marks",
  definition: "the seat a terminal is attached to, stated by the shell attaching it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The shell attaching to a seat states that seat rather than a reader working the seat out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark is beside the terminal's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark is named for its terminal as that terminal's page is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mark a shell wrote to attach is there from just before that attach until that attach returns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark names the pid of the shell and the moment that shell started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark whose pid started at another moment is a mark for a shell that is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell that ended without clearing its mark leaves a mark reaching no terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fresh shell overwrites the mark left under the same pid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder that cannot be read answers nothing rather than answering no mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat named by a mark that is no seat name is no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line naming the checkout comes from the caller rather than from here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks tmux which client sits on which session.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here walks a parent chain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which seats exist.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal the editor revived onto a seat states that seat as its shell starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shell writing a mark and the shell attaching are told apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark a revived terminal wrote goes when that terminal's shell ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That mark is cleared from the one exit trap the shell has rather than a second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attach in a revived terminal puts that terminal's own mark back as the attach returns.",
    },
  ],
} as const satisfies Module
