import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLittleMoreTimeWithYou = {
  id: "01a0b72f-33c1-70fc-b00f-906a27d286b9",
  type: "page-type/song",
  slug: "james-taylor-little-more-time-with-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "256947a8-10cb-4f01-b2fc-8d6efd27d8da",
      externalLink: "https://musicbrainz.org/work/256947a8-10cb-4f01-b2fc-8d6efd27d8da",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little More Time With You",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
