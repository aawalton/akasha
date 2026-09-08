import type { Module } from "@akasha/code/module"

export const checkReadonlyCollections = {
  id: "01a0810c-4add-7b15-afb0-efdd7579c434",
  pageTypeSlug: "module",
  slug: "check-readonly-collections",
  definition: "the run refusing a mutable collection type in a position it escapes from",
  code: "ts",
} as const satisfies Module
