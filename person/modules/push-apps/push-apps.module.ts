import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushApps = {
  id: "01a05c96-89f6-764e-b32f-d57a6a43bb6b",
  type: "page-type/module",
  slug: "push-apps",
  definition: "the bundle and the owner of each app registering for push",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every app that may register for push is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app's bundle is imported from the app's page, so a web bundle carries it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each app names the one person it pushes to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each app says whether a tap on its push opens the route the push carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here registers anything.",
    },
  ],
  createdAt: "2026-09-01T10:49:24.726Z",
  updatedAt: "2026-10-24T19:54:54.376Z",
} as const satisfies Module
