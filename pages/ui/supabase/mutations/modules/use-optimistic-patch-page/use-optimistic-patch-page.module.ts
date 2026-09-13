import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const useOptimisticPatchPage = {
  id: "01a061cd-1a4e-7003-b814-7031a04dbf00",
  type: "module",
  slug: "use-optimistic-patch-page",
  definition:
    "Overlays a predicted patch on one page in the local store, then runs the caller's patch.",
  code: "ts",
} as const satisfies Module
