import type { Manifest } from "@akasha/k8s-types/manifest"

export const postgresExporterManifests = {
  id: "01a06810-1263-72fe-8afe-90f910b27db9",
  pageTypeSlug: "manifest",
  slug: "postgres-exporter-manifests",
  definition: "the exporter that publishes the database's own state as metrics",
  code: "ts",
} as const satisfies Manifest
