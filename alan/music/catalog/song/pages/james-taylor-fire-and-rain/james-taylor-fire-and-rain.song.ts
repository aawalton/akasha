import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFireAndRain = {
  id: "01a0b72f-26e0-7f66-9f8f-aa58fa512ed4",
  type: "page-type/song",
  slug: "james-taylor-fire-and-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "70230b79-40c7-31ce-9937-93f40a357d2c",
      externalLink: "https://musicbrainz.org/work/70230b79-40c7-31ce-9937-93f40a357d2c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fire and Rain",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
