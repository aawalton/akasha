import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const supabaseRealtime = {
  id: "01a0738d-641f-71ab-93b6-38e0f40a9f92",
  type: "manifest",
  slug: "supabase-realtime",
  definition:
    "the namespace, service and deployment of the server pushing a row's change to subscribed browsers",
  parts: ["module/realtime-tenant-bootstrap"],
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the realtime-secrets secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys hashed are API_JWT_SECRET, DATABASE_URL, DB_ENC_KEY, METRICS_JWT_SECRET, SECRET_KEY_BASE.",
    },
  ],
} as const satisfies Manifest
