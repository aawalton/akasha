import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSummertimeBlues = {
  id: "01a0b72f-5185-78b1-ba1b-b2bfb7af63a6",
  type: "page-type/song",
  slug: "james-taylor-summertime-blues",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "abf54062-a8aa-31b2-96a5-a648a37f81b6",
      externalLink: "https://musicbrainz.org/work/abf54062-a8aa-31b2-96a5-a648a37f81b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Summertime Blues",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
