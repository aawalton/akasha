import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTiptoe = {
  id: "019ea49b-b4b4-7703-9b9a-788fc183e767",
  type: "page-type/song",
  slug: "imagine-dragons-tiptoe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f5335da-01c5-42b0-af5e-9c7ab6d39eb3",
      externalLink: "https://musicbrainz.org/work/1f5335da-01c5-42b0-af5e-9c7ab6d39eb3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tiptoe",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:22:08.308Z",
  updatedAt: "2026-09-19T16:40:46.000Z",
} as const satisfies Song
