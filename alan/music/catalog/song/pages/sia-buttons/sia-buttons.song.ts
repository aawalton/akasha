import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaButtons = {
  id: "019ea4c3-e8e3-7d3e-85df-2ed7fe36462b",
  type: "page-type/song",
  slug: "sia-buttons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57f3ced5-cb40-4a92-9bca-39b2c1fce206",
      externalLink: "https://musicbrainz.org/work/57f3ced5-cb40-4a92-9bca-39b2c1fce206",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Buttons",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
