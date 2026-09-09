import type { Module } from "@akasha/code/module"

export const useOptimisticPatchPages = {
  id: "01a061cd-1a4e-7004-91cf-df9e03590b06",
  pageTypeSlug: "module",
  type: "module",
  slug: "use-optimistic-patch-pages",
  definition: "Overlays a predicted patch on each matched page, then runs the caller's patch.",
  code: "ts",
} as const satisfies Module
