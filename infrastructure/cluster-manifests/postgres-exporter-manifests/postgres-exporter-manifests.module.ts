import type { Module } from "@akasha/code-system/module"

export const postgresExporterManifests = {
  id: "01a073af-0c9d-734d-9d97-227704cc6fcf",
  pageTypeSlug: "module",
  slug: "postgres-exporter-manifests",
  definition: "the exporter that publishes the database's own state as metrics",
  code: "ts",
} as const satisfies Module
