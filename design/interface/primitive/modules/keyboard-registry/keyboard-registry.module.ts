import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyboardRegistry = {
  id: "01a05be9-d4c7-787e-a190-6647b46fad91",
  type: "page-type/module",
  slug: "keyboard-registry",
  definition: "what a key binding has and how a key event is matched against it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two registrations of one id are described once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last registration of an id describes it, and the first sets where it sits.",
    },
  ],
} as const satisfies Module
