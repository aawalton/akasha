import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAdoptedClaudePort = {
  id: "01a0683e-3dbe-7002-909e-1e947514559c",
  type: "page-type/module",
  slug: "supervisor-adopted-claude-port",
  definition: "the gateway port behind an adopted Claude child's launch",
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
} as const satisfies Module
