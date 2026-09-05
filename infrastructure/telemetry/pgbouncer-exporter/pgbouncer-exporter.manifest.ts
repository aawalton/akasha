import type { Manifest } from "@akasha/k8s-types/manifest"

export const pgbouncerExporter = {
  id: "01a07395-071f-7a7b-959d-53aefec229ea",
  pageTypeSlug: "manifest",
  slug: "pgbouncer-exporter",
  definition: "the connection pool exporter's deployment and the way in to it",
  code: "ts",
} as const satisfies Manifest
