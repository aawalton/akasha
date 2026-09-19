import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHarrysGame = {
  id: "01a0b720-14fd-7a88-b3f5-662714fed739",
  type: "page-type/song",
  slug: "celtic-woman-harrys-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df62d08e-ac15-34d7-8ddb-8f524782b534",
      externalLink: "https://musicbrainz.org/work/df62d08e-ac15-34d7-8ddb-8f524782b534",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Harry's Game",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
