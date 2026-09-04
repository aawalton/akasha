import type { Module } from "@akasha/code-system/module"

export const guiSession = {
  id: "01a0685d-4b35-7008-800a-b27956eea787",
  pageTypeSlug: "module",
  slug: "gui-session",
  definition: "whether a macOS host has a login session launchd can put an agent in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A probe that emits no marker line reads as no session rather than as a session.",
    },
    {
      invariantKind: "departure",
      statement: "A marker carrying no exit code reads as no session.",
    },
  ],
} as const satisfies Module
