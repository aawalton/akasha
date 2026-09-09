import type { Module } from "@akasha/code/module"

export const nativeAuthRefresh = {
  id: "01a0655d-daa8-7183-8732-020a621a33c6",
  pageTypeSlug: "module",
  type: "module",
  slug: "native-auth-refresh",
  definition: "the session kept fresh while the native shell sleeps and wakes",
  code: "ts",
} as const satisfies Module
