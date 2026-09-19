import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNellaFantasia2 = {
  id: "01a0b720-13c4-715a-8d64-1ddb68267f3b",
  type: "page-type/song",
  slug: "celtic-woman-nella-fantasia-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3037809-4320-3c25-b9d0-08c37ff86e0b",
      externalLink: "https://musicbrainz.org/work/c3037809-4320-3c25-b9d0-08c37ff86e0b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nella fantasia",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
