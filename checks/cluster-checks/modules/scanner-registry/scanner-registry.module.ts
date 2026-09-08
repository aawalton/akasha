import type { Module } from "@akasha/code/module"

export const scannerRegistry = {
  id: "01a08106-1e80-7293-97f4-37f51a3de788",
  pageTypeSlug: "module",
  slug: "scanner-registry",
  definition: "the syntax scanners run together over one TypeScript file",
  code: "ts",
} as const satisfies Module
