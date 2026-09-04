import type { Module } from "@akasha/code-system/module"

export const supabaseStudioRbac = {
  id: "01a06860-955d-7016-8cd2-a9c65de65dd8",
  pageTypeSlug: "module",
  slug: "supabase-studio-rbac",
  definition:
    "the cluster permissions the pipeline engine is granted in the supabase-studio namespace",
  code: "ts",
} as const satisfies Module
