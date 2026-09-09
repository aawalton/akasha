import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const postgresCnpg = {
  id: "01a07391-2c99-7cff-92b8-d47c1f7bc114",
  pageTypeSlug: "manifest",
  slug: "postgres-cnpg",
  definition:
    "the namespace, volume, service, managed cluster, object store and scheduled backup of Postgres",
  parts: ["module/cnpg-cluster", "module/cnpg-object-store", "module/cnpg-scheduled-backup"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
