import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioCycles = {
  id: "019ea4f7-4ec8-75e8-8e52-1defd760bd71",
  type: "page-type/song",
  slug: "jessica-baio-cycles",
  title: "cycles",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0fdb2f2-fe08-4b7d-8d42-62329bb501a7",
      externalLink: "https://musicbrainz.org/recording/a0fdb2f2-fe08-4b7d-8d42-62329bb501a7",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
