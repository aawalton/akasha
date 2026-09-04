import type { Module } from "@akasha/code-system/module"

export const useOptimisticPatchPropertyDefinition = {
  id: "01a061cd-1a4e-7005-9858-4e40f08144bd",
  pageTypeSlug: "module",
  slug: "use-optimistic-patch-property-definition",
  definition:
    "Overlays a property definition patch, then runs the caller's patch once per matched page.",
  code: "ts",
} as const satisfies Module
