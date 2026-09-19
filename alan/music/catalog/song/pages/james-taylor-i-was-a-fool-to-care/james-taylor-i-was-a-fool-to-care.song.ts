import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIWasAFoolToCare = {
  id: "01a0b72f-4195-7b60-9e7c-3a63d5cadfcf",
  type: "page-type/song",
  slug: "james-taylor-i-was-a-fool-to-care",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbecbcb5-8bd7-48ea-94ee-4b1ab0da3f45",
      externalLink: "https://musicbrainz.org/work/cbecbcb5-8bd7-48ea-94ee-4b1ab0da3f45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Was a Fool to Care",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
