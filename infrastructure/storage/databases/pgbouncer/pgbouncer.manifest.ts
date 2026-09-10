import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const pgbouncer = {
  id: "01a0738b-94aa-753a-a80d-7381626f3577",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "pgbouncer",
  definition:
    "the namespace, config map, deployment and service of the pooler with the database connections",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
