import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRiptide = {
  id: "019ea416-404d-7f56-8948-128d519059b9",
  type: "page-type/song",
  slug: "taylor-swift-riptide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "edb01a8b-9378-4ac8-bfec-09fbe4a0e5d0",
      externalLink: "https://musicbrainz.org/work/edb01a8b-9378-4ac8-bfec-09fbe4a0e5d0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Riptide",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
