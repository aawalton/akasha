import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraGentleEarthquakes = {
  id: "019ea4a7-226a-7eeb-9abf-a911bded73bf",
  type: "page-type/song",
  slug: "aurora-gentle-earthquakes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d0e659cf-643f-4cfa-a1e3-ae6b597f6f6f",
      externalLink: "https://musicbrainz.org/work/d0e659cf-643f-4cfa-a1e3-ae6b597f6f6f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gentle Earthquakes",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
