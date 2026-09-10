import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const supabaseStudio = {
  id: "01a0738f-1b7c-7c03-9968-ae02ee8a654f",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "supabase-studio",
  definition:
    "the namespace, service and deployment of the interface the database is read and edited through",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
