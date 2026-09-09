import type { Module } from "@akasha/code/module"

export const allowanceWindowHours = {
  id: "01a081ad-4f44-7f3f-b448-40b02e22c3c3",
  pageTypeSlug: "module",
  type: "module",
  slug: "allowance-window-hours",
  definition: "how long until the soonest allowance window ahead of a moment turns over",
  code: "ts",
} as const satisfies Module
