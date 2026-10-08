import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLow = {
  id: "01a0ba60-fe9f-7213-8271-ea37fe5bda71",
  type: "page-type/song",
  slug: "coldplay-low",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fbec56bc-55ba-3a26-90b6-9bbe1f0b10e4",
      externalLink: "https://musicbrainz.org/work/fbec56bc-55ba-3a26-90b6-9bbe1f0b10e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Low",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:55:13.951Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
