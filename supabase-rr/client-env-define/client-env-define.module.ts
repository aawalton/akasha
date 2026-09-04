import type { Module } from "../../code-system/modules/module.page-type.ts"

export const clientEnvDefine = {
  id: "01a05c97-8af9-7918-b589-3367f4e75fba",
  pageTypeSlug: "module",
  slug: "client-env-define",
  definition: "the Supabase settings a client bundle is built with, fixed at build time",
  code: "ts",
} as const satisfies Module
