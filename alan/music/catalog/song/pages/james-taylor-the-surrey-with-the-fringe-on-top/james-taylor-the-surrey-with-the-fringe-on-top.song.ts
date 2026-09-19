import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheSurreyWithTheFringeOnTop = {
  id: "01a0b72f-5611-7c31-9b81-abcaab956e61",
  type: "page-type/song",
  slug: "james-taylor-the-surrey-with-the-fringe-on-top",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce1b19ac-fe5b-3ce8-83bd-81dde7a54e7a",
      externalLink: "https://musicbrainz.org/work/ce1b19ac-fe5b-3ce8-83bd-81dde7a54e7a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Surrey With the Fringe on Top",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
