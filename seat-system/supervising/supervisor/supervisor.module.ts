import type { Module } from "@akasha/code-system/module"

export const supervisor = {
  id: "01a06876-abda-7020-8e69-8116e86c2b23",
  pageTypeSlug: "module",
  slug: "supervisor",
  definition: "the supervisor's entry: read the arguments, boot, and run the seat",
  code: "ts",
} as const satisfies Module
