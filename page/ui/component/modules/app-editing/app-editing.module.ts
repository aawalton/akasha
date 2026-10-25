import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appEditing = {
  id: "01a0c58c-04d2-7bea-9650-c9d6c4f1e22a",
  type: "page-type/module",
  slug: "app-editing",
  definition: "whether a person edits an app from the browser",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "Marking a page done is using an app rather than editing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person marks pages done from the browser where that person edits the app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app not edited from the browser may still let a person mark pages done.",
    },
  ],
  createdAt: "2026-09-21T19:58:02.962Z",
  updatedAt: "2026-10-25T20:23:45.025Z",
} as const satisfies Module
