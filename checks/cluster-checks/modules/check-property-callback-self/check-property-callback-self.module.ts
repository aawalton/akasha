import type { Module } from "@akasha/code/module"

export const checkPropertyCallbackSelf = {
  id: "01a08108-1770-7a65-97cb-d57cff638323",
  pageTypeSlug: "module",
  slug: "check-property-callback-self",
  definition: "the run refusing a callback-typed property that declares no this parameter",
  code: "ts",
} as const satisfies Module
