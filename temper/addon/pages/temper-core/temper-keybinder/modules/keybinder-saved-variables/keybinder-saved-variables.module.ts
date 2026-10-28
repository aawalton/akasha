import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderSavedVariables = {
  id: "01a06381-67c1-7efa-89ba-519602e056ec",
  type: "page-type/module",
  slug: "keybinder-saved-variables",
  definition: "what the add-on keeps between sessions, shared by every character on the machine",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bindings are kept per user profile rather than per character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The captured changes and the last login's capture are kept beside the bindings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on is set going once the saved variables are in hand.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-10-28T22:04:42.239Z",
} as const satisfies Module
