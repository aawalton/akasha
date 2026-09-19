import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEyeToEye = {
  id: "019ea4c5-bed3-7231-a84a-6802f9bb28dc",
  type: "page-type/song",
  slug: "sia-eye-to-eye",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c40bc854-6c67-4a75-8ade-e12e35a2aebb",
      externalLink: "https://musicbrainz.org/work/c40bc854-6c67-4a75-8ade-e12e35a2aebb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eye to Eye",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
