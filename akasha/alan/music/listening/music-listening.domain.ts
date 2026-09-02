import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"

export const musicListening = {
  id: "01a06238-8d2d-7235-bf50-19c7fc57723c",
  pageTypeSlug: "domain",
  slug: "music-listening",
  definition: "what has been listened to",
  partSlugs: [
    "page-type/heard-music",
    "page-type/music-day",
    "text-property/artist-name",
    "text-property/spotify-track-id",
    "text-property/track-name",
  ],
} as const satisfies Domain
