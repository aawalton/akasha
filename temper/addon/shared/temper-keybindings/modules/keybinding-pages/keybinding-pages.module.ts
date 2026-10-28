import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybindingPages = {
  id: "01a1847d-4138-7b9c-9a99-cb2230a319ff",
  type: "page-type/module",
  slug: "keybinding-pages",
  definition: "a keybinding page read, written, and turned into the bindings the game holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game holds an action's bindings as four slots, each a key code and four modifiers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A modifier keeps its own place among the four: control, alt, shift, then command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant on a page is the game's count of seconds written in UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The config holds every keybinding page, shared or not, keyed by its action name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page written again keeps the id and the instant it was created.",
    },
  ],
  createdAt: "2026-10-28T21:49:23.639Z",
  updatedAt: "2026-10-28T21:49:23.639Z",
} as const satisfies Module
