import type { Module } from "@akasha/code/module"

export const pgbouncerExporterManifests = {
  id: "01a073ae-eadf-7519-a9a3-f4239f049022",
  pageTypeSlug: "module",
  type: "module",
  slug: "pgbouncer-exporter-manifests",
  definition: "the exporter that publishes the connection pool's state as metrics",
  code: "ts",
} as const satisfies Module
