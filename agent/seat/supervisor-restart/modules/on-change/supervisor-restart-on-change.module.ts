import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRestartOnChange = {
  id: "01a06876-abda-7014-a8df-2f19d8a36b1a",
  type: "page-type/module",
  slug: "supervisor-restart-on-change",
  definition: "restarting the supervisor when the files it runs from change",
  code: "ts",
  createdAt: "2026-09-03T18:10:02.842Z",
  updatedAt: "2026-09-24T15:11:23.000Z",
} as const satisfies Module
