import type { Module } from "@akasha/code-system/module"

export const useSetPropertyOptimistic = {
  id: "01a061df-fe7f-7002-af61-f503ba384122",
  pageTypeSlug: "module",
  slug: "use-set-property-optimistic",
  definition:
    "Sets one property on one page in the local store, then sends the patch the caller handed in.",
  code: "tsx",
} as const satisfies Module
