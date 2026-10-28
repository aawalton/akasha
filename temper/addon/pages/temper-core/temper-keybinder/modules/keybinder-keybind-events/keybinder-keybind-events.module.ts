import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderKeybindEvents = {
  id: "01a06381-67c1-7e9d-98cb-1b00a62bc68f",
  type: "page-type/module",
  slug: "keybinder-keybind-events",
  definition: "the game announcing a key bound or cleared, written back into what the add-on holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is recorded only while the key-bind window is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key set or cleared in the key-bind window is captured for the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on synchronises on the frame after the game announces the bindings.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-10-28T22:04:42.239Z",
} as const satisfies Module
