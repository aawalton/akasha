import type { Module } from "@akasha/code-system/module"

export const supervisorShutdownProcs = {
  id: "01a06876-abda-7016-9688-db83f6e02cc2",
  pageTypeSlug: "module",
  slug: "supervisor-shutdown-procs",
  definition: "killing the processes a supervisor owns as it shuts down",
  code: "ts",
} as const satisfies Module
