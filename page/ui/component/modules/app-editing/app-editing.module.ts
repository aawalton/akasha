import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appEditing = {
  id: "01a0c58c-04d2-7bea-9650-c9d6c4f1e22a",
  type: "page-type/module",
  slug: "app-editing",
  definition: "whether a person edits an app's own navigation and views from the browser",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An app is edited from the browser unless the app says otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app that is not edited from the browser shows no act that would edit it.",
    },
  ],
} as const satisfies Module
