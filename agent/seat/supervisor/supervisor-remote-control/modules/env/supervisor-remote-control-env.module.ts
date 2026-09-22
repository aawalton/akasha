import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRemoteControlEnv = {
  id: "01a06876-abda-700a-9970-c937e1deae9a",
  type: "page-type/module",
  slug: "supervisor-remote-control-env",
  definition: "a remote-controlled agent's spawn environment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spawn that omits remote control says it omitted remote control.",
    },
  ],
} as const satisfies Module
