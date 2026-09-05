import type { Manifest } from "@akasha/k8s-types/manifest"

export const supabaseStudio = {
  id: "01a0738f-1b7c-7c03-9968-ae02ee8a654f",
  pageTypeSlug: "manifest",
  slug: "supabase-studio",
  definition:
    "the namespace, service and deployment of the interface the database is read and edited through",
  code: "ts",
} as const satisfies Manifest
