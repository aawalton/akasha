import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const authProvider = {
  id: "01a06582-2737-7f5c-8019-8dd5e784db92",
  pageTypeSlug: "module",
  type: "module",
  slug: "auth-provider",
  definition:
    "the signed-in reader every route below this holds, and the session the page store gets",
  code: "tsx",
} as const satisfies Module
