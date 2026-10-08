import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTogether = {
  id: "019ea4ca-df45-7952-bafa-a2573e232c96",
  type: "page-type/song",
  slug: "sia-together",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1969db6f-1959-43da-a3a3-b5cdda5164d0",
      externalLink: "https://musicbrainz.org/work/1969db6f-1959-43da-a3a3-b5cdda5164d0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Together",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:13:39.397Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
