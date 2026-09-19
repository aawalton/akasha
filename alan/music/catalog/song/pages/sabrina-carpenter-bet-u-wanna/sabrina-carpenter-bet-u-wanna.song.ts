import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBetUWanna = {
  id: "01a0b723-cc80-7857-85af-46eaea08e560",
  type: "page-type/song",
  slug: "sabrina-carpenter-bet-u-wanna",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bdb50c1d-74a3-4233-84cf-bfad88839c3e",
      externalLink: "https://musicbrainz.org/work/bdb50c1d-74a3-4233-84cf-bfad88839c3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bet u wanna",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
