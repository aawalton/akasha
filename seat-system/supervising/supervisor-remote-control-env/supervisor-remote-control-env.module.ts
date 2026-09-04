import type { Module } from "@akasha/code-system/module"

export const supervisorRemoteControlEnv = {
  id: "01a06876-abda-700a-9970-c937e1deae9a",
  pageTypeSlug: "module",
  slug: "supervisor-remote-control-env",
  definition: "the environment a remote-controlled agent is spawned with",
  code: "ts",
} as const satisfies Module
