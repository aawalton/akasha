import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderInit = {
  id: "01a06381-67c1-7c76-96e7-07ef878b098c",
  type: "page-type/module",
  slug: "keybinder-init",
  definition: "the controls the add-on puts in the key-bind window and the events it watches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no shared bindings is filled from the defaults on first login.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each login takes the config's keybindings onto the shared bindings before applying them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each login says how many it set, then captures the character's bindings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bind button is held enabled so a bound key can be rebound.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-10-28T22:19:04.362Z",
} as const satisfies Module
