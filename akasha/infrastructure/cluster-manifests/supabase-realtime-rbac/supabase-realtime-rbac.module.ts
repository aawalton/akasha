import type { Module } from "@akasha/code-system/module"

export const supabaseRealtimeRbac = {
  id: "01a06860-955d-7015-b286-903a1464a1db",
  pageTypeSlug: "module",
  slug: "supabase-realtime-rbac",
  definition:
    "the cluster permissions the pipeline engine is granted in the supabase-realtime namespace",
  code: "ts",
} as const satisfies Module
