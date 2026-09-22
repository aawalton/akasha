import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentNameBind = {
  id: "01a0695a-d2ea-7203-a1a2-06a2a8188bc0",
  type: "page-type/module",
  slug: "agent-name-bind",
  definition:
    "a name request taken from what the workstation sees, prior holder and ancestry included",
  code: "ts",
} as const satisfies Module
