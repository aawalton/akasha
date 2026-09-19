import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWavelengths = {
  id: "019ea4a5-c1eb-7a2e-9bfe-7afa4d83e9d4",
  type: "page-type/song",
  slug: "aurora-wavelengths",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7178863d-3bed-4bb1-abcf-e3c907fc7505",
      externalLink: "https://musicbrainz.org/work/7178863d-3bed-4bb1-abcf-e3c907fc7505",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WAVELENGTHS",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
