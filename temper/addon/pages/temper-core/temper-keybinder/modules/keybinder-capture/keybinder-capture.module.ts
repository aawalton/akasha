import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderCapture = {
  id: "01a1848b-457f-7a40-ade3-81b78a7e60da",
  type: "page-type/module",
  slug: "keybinder-capture",
  definition:
    "Alan's rebinds and each login's bindings, written into the keybinder's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebind is captured with the instant the game gives it, in seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebind the add-on makes itself while applying the pages is not captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rebind captures the action's four slots, its sharing, its layer and its category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The login capture holds every action with a key or a shared binding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each login's capture replaces the last one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden action is captured neither way.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's `GetString` takes a string id as a number, never an id's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action whose name has no string id is captured with no title.",
    },
  ],
  createdAt: "2026-10-28T22:04:42.239Z",
  updatedAt: "2026-10-28T22:19:04.362Z",
} as const satisfies Module
