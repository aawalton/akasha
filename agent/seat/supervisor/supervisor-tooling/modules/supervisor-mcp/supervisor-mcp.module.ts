import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorMcp = {
  id: "01a0687b-aa8a-7000-b99b-66144cf69680",
  type: "page-type/module",
  slug: "supervisor-mcp",
  definition: "the mcp servers an agent is launched with, and the disabled ones cleared away",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A server the registry declares is offered rather than opened to be tried first.",
    },
  ],
} as const satisfies Module
