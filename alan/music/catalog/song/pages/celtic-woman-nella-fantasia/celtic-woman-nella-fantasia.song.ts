import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNellaFantasia = {
  id: "01a0b720-0eaa-745c-b33c-55819ffe9a7b",
  type: "page-type/song",
  slug: "celtic-woman-nella-fantasia",
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
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
