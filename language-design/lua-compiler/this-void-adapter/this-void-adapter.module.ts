import type { Module } from "@akasha/code/module"

export const thisVoidAdapter = {
  id: "01a06758-8e95-7002-a49e-fc6db8a3b011",
  pageTypeSlug: "module",
  type: "module",
  slug: "this-void-adapter",
  definition:
    "the wrapper function expression a 'this: void' function becomes in a self-ful position",
  code: "ts",
} as const satisfies Module
