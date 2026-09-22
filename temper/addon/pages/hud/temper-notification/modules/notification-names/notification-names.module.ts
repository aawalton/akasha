import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationNames = {
  id: "01a0605a-0516-74bf-b0cd-cd67f0cacaba",
  type: "page-type/module",
  slug: "notification-names",
  definition: "the global name another add-on reads the notification rows from",
  code: "ts",
} as const satisfies Module
