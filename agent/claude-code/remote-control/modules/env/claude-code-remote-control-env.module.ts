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
} as const satisfies Module
