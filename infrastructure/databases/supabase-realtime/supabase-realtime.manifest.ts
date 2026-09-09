import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const supabaseRealtime = {
  id: "01a0738d-641f-71ab-93b6-38e0f40a9f92",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "supabase-realtime",
  definition:
    "the namespace, service and deployment of the server pushing a row's change to subscribed browsers",
  parts: ["module/realtime-tenant-bootstrap"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
