import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const claudeCodeRemoteControlEnv = {
  id: "01a06876-abda-700a-9970-c937e1deae9a",
  type: "page-type/module",
  slug: "claude-code-remote-control-env",
  definition: "the values a Claude Code process uses for Claude Code Remote Control",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spawn that omits remote control says it omitted remote control.",
    },
  ],
  createdAt: "2026-09-03T18:10:02.842Z",
  updatedAt: "2026-09-25T17:51:47.000Z",
} as const satisfies Module
