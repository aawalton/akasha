import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderFilter = {
  id: "01a06381-67c1-70e1-ad09-ace0c705c355",
  type: "page-type/module",
  slug: "keybinder-filter",
  definition: "the order and the narrowing of the key-bind list the keyboard screen builds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The list is rebuilt a fifth of a second after the last keystroke rather than on every keystroke.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category whose own name matches is kept whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uppercased action name is remembered rather than uppercased again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Filtering applies only while the master list is being built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The categories within each layer are sorted by the name shown, with no color and in any case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The layers keep the order the game gives them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sorting reorders copies of the game's layers, so the indices a row binds through stay the game's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The gamepad key-bind screen keeps the game's order.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-10-28T21:22:06.777Z",
} as const satisfies Module
