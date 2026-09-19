import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaRainbow = {
  id: "019ea4cc-cb50-7d41-aab6-0651c5c421bb",
  type: "page-type/song",
  slug: "sia-rainbow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7b7982cf-d8f0-4cdb-bb56-334c4a753265",
      externalLink: "https://musicbrainz.org/work/7b7982cf-d8f0-4cdb-bb56-334c4a753265",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainbow",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
