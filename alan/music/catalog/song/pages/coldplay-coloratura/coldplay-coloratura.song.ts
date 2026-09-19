import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayColoratura = {
  id: "01a0ba5d-464f-7360-a0b4-058a5d0d9d49",
  type: "page-type/song",
  slug: "coldplay-coloratura",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3ebc27b-19b3-4bb7-8c2f-039357d41b9b",
      externalLink: "https://musicbrainz.org/work/c3ebc27b-19b3-4bb7-8c2f-039357d41b9b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Coloratura",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
