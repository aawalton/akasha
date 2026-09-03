import type { Module } from "@akasha/code-system/module"

export const supervisorSeatDefaults = {
  id: "01a06876-abda-700e-b7c6-fdaa53c08fc1",
  pageTypeSlug: "module",
  slug: "supervisor-seat-defaults",
  definition: "the mode, call and slots a seat declares as its defaults",
  code: "ts",
} as const satisfies Module
