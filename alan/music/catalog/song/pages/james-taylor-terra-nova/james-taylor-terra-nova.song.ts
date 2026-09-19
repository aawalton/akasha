import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTerraNova = {
  id: "01a0b72f-4c7b-7bfc-941f-cd19b3666996",
  type: "page-type/song",
  slug: "james-taylor-terra-nova",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5818f610-c313-375c-96a8-6122c74935a0",
      externalLink: "https://musicbrainz.org/work/5818f610-c313-375c-96a8-6122c74935a0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Terra Nova",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
