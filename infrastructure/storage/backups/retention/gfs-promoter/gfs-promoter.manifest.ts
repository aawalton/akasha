import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const gfsPromoter = {
  id: "01a0737e-ca74-77d1-ad41-f4ccc595aad2",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "gfs-promoter",
  definition: "the scheduled job deciding which Postgres backups are kept and which are released",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
