import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBelfastToBoston = {
  id: "01a0b72f-2c8d-75a9-947a-24c9f024ef66",
  type: "page-type/song",
  slug: "james-taylor-belfast-to-boston",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8e2e067-c432-48f5-abd6-4a95090f8d01",
      externalLink: "https://musicbrainz.org/work/b8e2e067-c432-48f5-abd6-4a95090f8d01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Belfast to Boston",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
