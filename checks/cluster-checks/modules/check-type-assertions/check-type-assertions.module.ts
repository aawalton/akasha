import type { Module } from "@akasha/code/module"

export const checkTypeAssertions = {
  id: "01a08164-3ae8-7f3f-b914-d78c081f3159",
  pageTypeSlug: "module",
  slug: "check-type-assertions",
  definition: "the run refusing a type assertion outside `as const` and a brand constructor",
  code: "ts",
} as const satisfies Module
