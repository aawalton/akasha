import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisor = {
  id: "01a06876-abda-7020-8e69-8116e86c2b23",
  type: "module",
  slug: "supervisor",
  definition: "the supervisor's entry: read the arguments, boot, and run the seat",
  code: "ts",
} as const satisfies Module
