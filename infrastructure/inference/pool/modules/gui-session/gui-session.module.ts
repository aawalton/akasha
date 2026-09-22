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
} as const satisfies Module
