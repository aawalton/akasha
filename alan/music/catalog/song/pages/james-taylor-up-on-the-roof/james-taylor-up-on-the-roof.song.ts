import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorUpOnTheRoof = {
  id: "01a0b72f-48a0-7a28-9a41-b3af1d2c9aa4",
  type: "page-type/song",
  slug: "james-taylor-up-on-the-roof",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "28a099b7-fd4c-3040-9d66-77a88cfb41c6",
      externalLink: "https://musicbrainz.org/work/28a099b7-fd4c-3040-9d66-77a88cfb41c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up on the Roof",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:04.448Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
