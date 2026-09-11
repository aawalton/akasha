import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const postgresExporterManifests = {
  id: "01a073af-0c9d-734d-9d97-227704cc6fcf",
  type: "module",
  slug: "postgres-exporter-manifests",
  definition: "the exporter that publishes the database's own state as metrics",
  code: "ts",
} as const satisfies Module
