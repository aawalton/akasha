import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAdoptedClaudePort = {
  id: "01a0683e-3dbe-7002-909e-1e947514559c",
  type: "page-type/module",
  slug: "supervisor-adopted-claude-port",
  definition: "how code reads the port of the model gateway a Claude Code process uses",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A port is read from the adopted child's own environment rather than from this environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base url that is not loopback http names no port.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:37:00.784Z",
} as const satisfies Module
