import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonStateside = {
  id: "019ea4a2-0fbd-7ab3-bc54-79e2c91fa284",
  type: "page-type/song",
  slug: "zara-larsson-stateside",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f6bae4e7-c9a9-42a2-8c5d-527b366593f4",
      externalLink: "https://musicbrainz.org/work/f6bae4e7-c9a9-42a2-8c5d-527b366593f4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stateside",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:29:04.829Z",
  updatedAt: "2026-09-19T16:47:26.000Z",
} as const satisfies Song
