import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaReaper = {
  id: "019ea4cb-4242-71e4-90c9-323d4ae0e5ff",
  type: "page-type/song",
  slug: "sia-reaper",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26a2e610-11e2-4afc-9d82-c6ba55cdcaa4",
      externalLink: "https://musicbrainz.org/work/26a2e610-11e2-4afc-9d82-c6ba55cdcaa4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Reaper",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
