import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLetMeRide = {
  id: "01a0b72f-3bbc-78b6-bc9d-2fe336e914ec",
  type: "page-type/song",
  slug: "james-taylor-let-me-ride",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9783aa0b-c345-4288-88a1-14ab008e60d5",
      externalLink: "https://musicbrainz.org/work/9783aa0b-c345-4288-88a1-14ab008e60d5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Me Ride",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
