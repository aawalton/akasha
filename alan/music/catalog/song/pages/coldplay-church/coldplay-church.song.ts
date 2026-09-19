import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayChurch = {
  id: "01a0ba5d-450d-727c-ba15-868848460e15",
  type: "page-type/song",
  slug: "coldplay-church",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b842cf97-580e-42d5-9aa3-49c9a0a7dbdb",
      externalLink: "https://musicbrainz.org/work/b842cf97-580e-42d5-9aa3-49c9a0a7dbdb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Church",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
