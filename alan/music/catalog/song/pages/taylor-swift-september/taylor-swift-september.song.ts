import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSeptember = {
  id: "019ea416-3121-7af6-9491-c9b6e9b9fa0b",
  type: "page-type/song",
  slug: "taylor-swift-september",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ace8b4f-bfbf-36a0-9089-2c0e489411a4",
      externalLink: "https://musicbrainz.org/work/3ace8b4f-bfbf-36a0-9089-2c0e489411a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "September",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.337Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
