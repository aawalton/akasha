import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSoFarAway = {
  id: "01a0b72f-47cf-7984-96d4-dae805f4d70f",
  type: "page-type/song",
  slug: "james-taylor-so-far-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "272530d5-2d53-3e05-a6b5-9b4ed7535a52",
      externalLink: "https://musicbrainz.org/work/272530d5-2d53-3e05-a6b5-9b4ed7535a52",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So Far Away",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
