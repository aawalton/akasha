import type { Module } from "@akasha/code-system/module"

export const supervisorRemoteControlDefault = {
  id: "01a06876-abda-7009-b21c-8a927fe01099",
  pageTypeSlug: "module",
  slug: "supervisor-remote-control-default",
  definition: "the fallback verdict for remote control where no rule answers",
  code: "ts",
} as const satisfies Module
