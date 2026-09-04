import type { Module } from "@akasha/code-system/module"

export const pgbouncerExporterManifests = {
  id: "01a06810-1263-72f2-a54b-54d681b6293a",
  pageTypeSlug: "module",
  slug: "pgbouncer-exporter-manifests",
  definition: "the exporter that publishes the connection pool's state as metrics",
  code: "ts",
} as const satisfies Module
