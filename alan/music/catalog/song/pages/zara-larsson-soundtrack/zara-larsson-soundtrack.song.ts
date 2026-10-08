import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSoundtrack = {
  id: "019ea4a1-23eb-7a8d-8f7c-537cd0a0435a",
  type: "page-type/song",
  slug: "zara-larsson-soundtrack",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bb20316c-177b-42dd-8efd-550a235e1625",
      externalLink: "https://musicbrainz.org/work/bb20316c-177b-42dd-8efd-550a235e1625",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soundtrack",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:28:04.459Z",
  updatedAt: "2026-09-19T16:47:26.000Z",
} as const satisfies Song
