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
      decisionKind: "decision-kind/absence",
      statement: "Nothing here registers anything.",
    },
  ],
} as const satisfies Module
