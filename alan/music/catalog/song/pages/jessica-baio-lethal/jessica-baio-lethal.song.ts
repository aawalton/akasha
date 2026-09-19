import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioLethal = {
  id: "019ea4f8-04b4-7511-945c-545d621ac679",
  type: "page-type/song",
  slug: "jessica-baio-lethal",
  title: "lethal",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad2736a3-1adc-4431-b55c-5c7e0fbb8304",
      externalLink: "https://musicbrainz.org/recording/ad2736a3-1adc-4431-b55c-5c7e0fbb8304",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
