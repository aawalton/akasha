import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkoutShellReach = {
  id: "01a0d962-3123-75e8-aa0f-ed8bf842f3a7",
  type: "page-type/module",
  slug: "checkout-shell-reach",
  definition: "whether a shell command shows the body of a file in the akasha folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The programs reading files, and how a word is read as paths, are lore-shell-reach's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A program copying, archiving, listing or comparing files without printing them shows no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader shows a body where a path it is handed is a file inside this checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glob is judged by the folder its fixed opening names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a line writes to is not a path the line reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A search shows lines where it is handed a path inside this checkout or a folder holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recursive search handed no path searches the folder the call runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search printing only paths or counts shows no line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader fed names by a line listing this checkout shows the bodies it is fed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A git call showing a file at HEAD, in the index or on disk shows a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A git patch of a commit, and a file at any other revision, are history rather than a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A git difference between two revisions is history, and one reaching the files on disk is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the caller exempts shows no body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A path the shell builds as it runs is not seen.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A program reading a path its own code names is not seen.",
    },
  ],
} as const satisfies Module
