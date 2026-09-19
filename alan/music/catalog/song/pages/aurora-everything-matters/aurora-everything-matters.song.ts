import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraEverythingMatters = {
  id: "019ea4a4-02e4-7399-bd6d-a9ecbaf6c94e",
  type: "page-type/song",
  slug: "aurora-everything-matters",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2fdf2dff-5f8a-460a-a9a8-0fcc717e04d7",
      externalLink: "https://musicbrainz.org/work/2fdf2dff-5f8a-460a-a9a8-0fcc717e04d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everything Matters",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
