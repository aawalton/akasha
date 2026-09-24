import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreShellReach = {
  id: "01a0d48a-ca74-7d30-b9a7-0c5cef8978ac",
  type: "page-type/module",
  slug: "lore-shell-reach",
  definition: "whether a shell command line reaches lore a game master's seat is kept from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line naming a withheld page's file name anywhere reaches that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word is split at every colon and equals sign, and each piece is judged as a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glob is judged by the withheld pages and folders it would match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder reaches a withheld page only where a program reading files is handed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line feeding names to a program that runs another reads every folder the line names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recursive search naming no path searches the folder the call runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change of folder earlier in the line moves where the rest of the line runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A git call printing file bodies across the tree reaches the lore unless paths limit it away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A git call printing no body is let through.",
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
