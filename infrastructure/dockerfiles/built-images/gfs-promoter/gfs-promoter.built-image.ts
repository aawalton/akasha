import type { BuiltImage } from "../built-image.page-type.ts"

export const gfsPromoter = {
  id: "01a08194-6715-7c46-9a2d-7b4740d6ca3d",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "gfs-promoter",
  definition: "the image the backup promoter runs in",
  kind: "bun-service",
  folder: "infrastructure/backup-retention",
} as const satisfies BuiltImage
