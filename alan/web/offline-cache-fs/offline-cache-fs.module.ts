import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const offlineCacheFs = {
  id: "01a0655d-daab-77c4-8e13-0468219b5e40",
  type: "module",
  slug: "offline-cache-fs",
  definition: "the offline cache's files read, written, listed and taken away on the device",
  code: "ts",
} as const satisfies Module
