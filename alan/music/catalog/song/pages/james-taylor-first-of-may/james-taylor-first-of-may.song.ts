import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFirstOfMay = {
  id: "01a0b72f-2605-742f-a7cd-6caad89a4a9f",
  type: "page-type/song",
  slug: "james-taylor-first-of-may",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "68e43bab-3979-44b5-bd75-de459c6c8116",
      externalLink: "https://musicbrainz.org/work/68e43bab-3979-44b5-bd75-de459c6c8116",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "First of May",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
