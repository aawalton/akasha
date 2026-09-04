import type { Module } from "@akasha/code-system/module"

export const flatQueryArgs = {
  id: "01a05c3b-4fc4-7e60-929d-25e876de8431",
  pageTypeSlug: "module",
  slug: "flat-query-args",
  definition:
    "Builds flat-list query args with a synthetic filter and sort cache key, or none when grouped.",
  code: "ts",
} as const satisfies Module
