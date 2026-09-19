import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTwistedLogic = {
  id: "01a0ba60-f9a2-7b84-b01d-fdd8af9b07fe",
  type: "page-type/song",
  slug: "coldplay-twisted-logic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bcd72eae-37f6-3d06-8cac-916ff2c89986",
      externalLink: "https://musicbrainz.org/work/bcd72eae-37f6-3d06-8cac-916ff2c89986",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Twisted Logic",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
