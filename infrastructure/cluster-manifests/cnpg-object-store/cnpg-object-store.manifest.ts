import type { Manifest } from "@akasha/k8s-types/manifest"

export const cnpgObjectStore = {
  id: "01a06810-1262-7032-8aec-41b84efe28f1",
  pageTypeSlug: "manifest",
  slug: "cnpg-object-store",
  definition: "the bucket the database's backups are written to",
  code: "ts",
} as const satisfies Manifest
