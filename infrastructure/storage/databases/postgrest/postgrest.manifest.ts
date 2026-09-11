import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const postgrest = {
  id: "01a07388-0aab-752f-88b5-67dfc8f38a5c",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "postgrest",
  definition: "the namespace, deployment and service serving the database's tables over HTTP",
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the postgrest-secrets secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys hashed from the postgrest-secrets secret are DATABASE_URL and PGRST_JWT_SECRET.",
    },
  ],
} as const satisfies Manifest
