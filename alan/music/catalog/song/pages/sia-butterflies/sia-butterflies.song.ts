import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaButterflies = {
  id: "019ea4c2-92cb-729c-a0cc-7f48e0184f52",
  type: "page-type/song",
  slug: "sia-butterflies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "04c0d176-6fe4-4c5c-ae7f-34c41c9499c0",
      externalLink: "https://musicbrainz.org/work/04c0d176-6fe4-4c5c-ae7f-34c41c9499c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Butterflies",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
