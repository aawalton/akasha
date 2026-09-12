import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const kubectl = {
  id: "01a06813-7b0f-78f8-8420-3ac40730df9b",
  type: "module",
  slug: "kubectl",
  definition: "a spawned `kubectl` with a chosen kubeconfig, answered as a promise",
  code: "ts",
} as const satisfies Module
