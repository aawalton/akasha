import type { Manifest } from "@akasha/k8s-types/manifest"

export const postgresExporter = {
  id: "01a07396-d8bf-7514-af72-2499f6246428",
  pageTypeSlug: "manifest",
  slug: "postgres-exporter",
  definition: "the database exporter's queries, its deployment and the way in to it",
  code: "ts",
} as const satisfies Manifest
