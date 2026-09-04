import type { Manifest } from "@akasha/k8s-types/manifest"

export const pgbouncerExporterManifests = {
  id: "01a06810-1263-72f2-a54b-54d681b6293a",
  pageTypeSlug: "manifest",
  slug: "pgbouncer-exporter-manifests",
  definition: "the exporter that publishes the connection pool's state as metrics",
  code: "ts",
} as const satisfies Manifest
