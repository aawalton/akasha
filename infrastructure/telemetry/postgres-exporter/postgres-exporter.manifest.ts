import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const postgresExporter = {
  id: "01a07396-d8bf-7514-af72-2499f6246428",
  pageTypeSlug: "manifest",
  slug: "postgres-exporter",
  definition: "the database exporter's queries, its deployment and the way in to it",
  parts: [
    "module/postgres-exporter-manifests",
    "module/query-perf-constants",
    "module/query-perf-queries",
  ],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
