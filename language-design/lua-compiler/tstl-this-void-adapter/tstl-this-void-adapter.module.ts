import type { Module } from "@akasha/code-system/module"

export const tstlThisVoidAdapter = {
  id: "01a06758-8e95-7002-a49e-fc6db8a3b011",
  pageTypeSlug: "module",
  slug: "tstl-this-void-adapter",
  definition:
    "the wrapper function expression a 'this: void' function becomes in a self-ful position",
  code: "ts",
} as const satisfies Module
