import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTrouble = {
  id: "019ea49c-a4ab-7c6c-8de1-a0491c401d6c",
  type: "page-type/song",
  slug: "imagine-dragons-trouble",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa8c5853-f3cb-492d-9d8b-ec27e77feb65",
      externalLink: "https://musicbrainz.org/work/aa8c5853-f3cb-492d-9d8b-ec27e77feb65",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:23:09.739Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
