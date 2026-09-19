import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNobody = {
  id: "019ea4e8-2c27-79e7-9990-b78ca91c39c1",
  type: "page-type/song",
  slug: "ariana-grande-nobody",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ec77fa28-b3a5-4211-a33c-1d78160f57a1",
      externalLink: "https://musicbrainz.org/work/ec77fa28-b3a5-4211-a33c-1d78160f57a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nobody",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
