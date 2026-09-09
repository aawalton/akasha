import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const pgbouncerExporter = {
  id: "01a07395-071f-7a7b-959d-53aefec229ea",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "pgbouncer-exporter",
  definition: "the connection pool exporter's deployment and the way in to it",
  parts: ["module/pgbouncer-exporter-manifests"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
