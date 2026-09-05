import type { Manifest } from "@akasha/k8s-types/manifest"

export const supabaseRealtime = {
  id: "01a0738d-641f-71ab-93b6-38e0f40a9f92",
  pageTypeSlug: "manifest",
  slug: "supabase-realtime",
  definition:
    "the namespace, service and deployment of the server pushing a row's change to subscribed browsers",
  code: "ts",
} as const satisfies Manifest
