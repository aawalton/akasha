import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfiles/built-images/built-image.page-type.types.ts"

export const gfsPromoter = {
  id: "01a08194-6715-7c46-9a2d-7b4740d6ca3d",
  type: "built-image",
  slug: "gfs-promoter",
  definition: "the image the backup promoter runs in",
  kind: "bun-service",
  folder: "infrastructure/storage/backups/retention",
  extensions: "json",
} as const satisfies BuiltImage
