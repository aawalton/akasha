import type { ReadonlyJSONValue } from "../../schema/pages/pages.module.code.ts"

export type GalleryCardSize = "small" | "medium" | "large"

export const GALLERY_CARD_SIZES: readonly GalleryCardSize[] = ["small", "medium", "large"]

export const DEFAULT_GALLERY_CARD_SIZE: GalleryCardSize = "medium"

const GALLERY_CARD_MIN_WIDTH: Record<GalleryCardSize, number> = {
  small: 200,
  medium: 280,
  large: 380,
}

export function galleryCardMinWidth(size: GalleryCardSize): number {
  return GALLERY_CARD_MIN_WIDTH[size]
}

function isGalleryCardSize(value: unknown): value is GalleryCardSize {
  return typeof value === "string" && GALLERY_CARD_SIZES.some((size) => size === value)
}

export function resolveGalleryCardSize(value: unknown): GalleryCardSize {
  return isGalleryCardSize(value) ? value : DEFAULT_GALLERY_CARD_SIZE
}

export function resolveGalleryCoverUrl(value: ReadonlyJSONValue | undefined): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}
