import type { Module } from "@akasha/code-system/module"

export const prewarm = {
  id: "01a05ca9-d803-7af2-9d91-623f009fb638",
  pageTypeSlug: "module",
  slug: "prewarm",
  definition: "waiting for a dev server to stop re-navigating before a test drives it",
  code: "ts",
} as const satisfies Module
