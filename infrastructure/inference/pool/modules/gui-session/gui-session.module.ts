import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const guiSession = {
  id: "01a0685d-4b35-7008-800a-b27956eea787",
  type: "page-type/module",
  slug: "gui-session",
  definition: "whether launchd can put an agent in a macOS host's login session",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A probe that emits no marker line reads as no session rather than as a session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker with no exit code reads as no session.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-22T14:01:10.000Z",
} as const satisfies Module
