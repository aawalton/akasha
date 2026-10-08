import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHassHass = {
  id: "019ea4c7-4d84-7545-a227-2bc1b0e1d08a",
  type: "page-type/song",
  slug: "sia-hass-hass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "36b040c7-290a-4c93-aa82-5829399eff7c",
      externalLink: "https://musicbrainz.org/work/36b040c7-290a-4c93-aa82-5829399eff7c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hass Hass",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:09:45.476Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
