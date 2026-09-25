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
  ],
} as const satisfies Module
