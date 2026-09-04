import type { Module } from "@akasha/code-system/module"

export const supervisorAdoptedClaudePort = {
  id: "01a0683e-3dbe-7002-909e-1e947514559c",
  pageTypeSlug: "module",
  slug: "supervisor-adopted-claude-port",
  definition: "the proxy port an adopted Claude child was launched against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A port is read from the adopted child's own environment rather than from this one.",
    },
    {
      invariantKind: "departure",
      statement: "A base url that is not loopback http names no port.",
    },
  ],
} as const satisfies Module
