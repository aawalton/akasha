import type { Module } from "@akasha/code/module"

export const checkNoVoidReturn = {
  id: "01a08160-2f84-7eb3-9cf1-c474dbef6883",
  pageTypeSlug: "module",
  slug: "check-no-void-return",
  definition: "the run refusing a `: void` return annotation on a function definition",
  code: "ts",
} as const satisfies Module
