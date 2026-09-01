import type { Module } from "@akasha/code-system/module"

export const noOp = {
  id: "01a05cf2-453a-7cba-9514-812f41ef987e",
  pageTypeSlug: "module",
  slug: "no-op",
  definition: "a call that does nothing and answers nothing",
  code: "ts",
} as const satisfies Module
