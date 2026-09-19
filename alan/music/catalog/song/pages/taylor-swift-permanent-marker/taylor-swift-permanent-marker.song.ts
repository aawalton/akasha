import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPermanentMarker = {
  id: "019ea416-39e0-7229-b085-74d0790eee81",
  type: "page-type/song",
  slug: "taylor-swift-permanent-marker",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a37d7744-9232-4ae6-a730-221b6505fb12",
      externalLink: "https://musicbrainz.org/work/a37d7744-9232-4ae6-a730-221b6505fb12",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Permanent Marker",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
