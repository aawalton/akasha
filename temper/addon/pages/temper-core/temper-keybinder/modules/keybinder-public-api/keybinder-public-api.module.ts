import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderPublicApi = {
  id: "01a06381-67c1-75f6-ba15-5366cbc95058",
  type: "page-type/module",
  slug: "keybinder-public-api",
  definition: "the global carrying the toggle the key binding in the markup calls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is named for the addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global has the one toggle and nothing more.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-09-22T13:48:38.000Z",
} as const satisfies Module
