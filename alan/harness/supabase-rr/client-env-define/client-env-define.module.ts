import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const clientEnvDefine = {
  id: "01a05c97-8af9-7918-b589-3367f4e75fba",
  pageTypeSlug: "module",
  type: "module",
  slug: "client-env-define",
  definition: "the Supabase settings a client bundle reads, guarded rather than inlined",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The guard refuses a build rather than the loading of a config.",
    },
  ],
} as const satisfies Module
