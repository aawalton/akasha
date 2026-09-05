import type { Manifest } from "@akasha/k8s-types/manifest"

export const pgbouncer = {
  id: "01a0738b-94aa-753a-a80d-7381626f3577",
  pageTypeSlug: "manifest",
  slug: "pgbouncer",
  definition:
    "the namespace, config map, deployment and service of the pooler holding the database connections",
  code: "ts",
} as const satisfies Manifest
