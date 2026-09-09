import type { Module } from "@akasha/code/module"

export const supervisorReexec = {
  id: "01a06876-abda-7008-8336-a12d58c15efa",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-reexec",
  definition: "re-execing the supervisor in place, handing the running claude over",
  code: "ts",
} as const satisfies Module
