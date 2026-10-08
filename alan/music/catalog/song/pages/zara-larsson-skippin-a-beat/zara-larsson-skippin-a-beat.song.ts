import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSkippinABeat = {
  id: "019ea4a0-8c5c-7e2e-8845-c570911bb621",
  type: "page-type/song",
  slug: "zara-larsson-skippin-a-beat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "979ba368-f8bf-4c5f-8af9-10ea72a31892",
      externalLink: "https://musicbrainz.org/work/979ba368-f8bf-4c5f-8af9-10ea72a31892",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Skippin a Beat",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:27:25.660Z",
  updatedAt: "2026-09-19T16:47:26.000Z",
} as const satisfies Song
