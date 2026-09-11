import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const useOptimisticPatchPages = {
  id: "01a061cd-1a4e-7004-91cf-df9e03590b06",
  type: "module",
  slug: "use-optimistic-patch-pages",
  definition: "Overlays a predicted patch on each matched page, then runs the caller's patch.",
  code: "ts",
} as const satisfies Module
