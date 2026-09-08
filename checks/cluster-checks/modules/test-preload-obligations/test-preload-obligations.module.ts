import type { Module } from "@akasha/code/module"

export const testPreloadObligations = {
  id: "01a0817d-2eee-7560-97ee-d433a5541178",
  pageTypeSlug: "module",
  slug: "test-preload-obligations",
  definition: "the preload a workspace's component tests want, against what its bunfig registers",
  code: "ts",
} as const satisfies Module
