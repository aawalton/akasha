import type { Module } from "@akasha/code-system/module"

export const readoutGuarding = {
  id: "01a0655e-d39a-743e-a192-9fef67057d38",
  pageTypeSlug: "module",
  slug: "readout-guarding",
  definition: "a readout request refused unless its device secret and its access both stand",
  code: "ts",
} as const satisfies Module
