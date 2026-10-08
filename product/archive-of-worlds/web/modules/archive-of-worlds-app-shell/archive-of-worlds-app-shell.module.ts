import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const archiveOfWorldsAppShell = {
  id: "01a06582-2737-7d8f-ad6c-6aac1e470170",
  type: "page-type/module",
  slug: "archive-of-worlds-app-shell",
  definition:
    "the frame every archive of worlds route renders inside, with its sidebar and its navs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every item this shell draws in its navigation is a nav page, and none is in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name over the navigation is the title of the Archive of Worlds web app page.",
    },
  ],
  createdAt: "2026-09-03T04:23:43.671Z",
  updatedAt: "2026-09-27T11:46:21.000Z",
} as const satisfies Module
