import type { Manifest } from "@akasha/k8s-types/manifest"

export const gfsPromoter = {
  id: "01a0737e-ca74-77d1-ad41-f4ccc595aad2",
  pageTypeSlug: "manifest",
  slug: "gfs-promoter",
  definition: "the scheduled job deciding which Postgres backups are kept and which are released",
  code: "ts",
} as const satisfies Manifest
