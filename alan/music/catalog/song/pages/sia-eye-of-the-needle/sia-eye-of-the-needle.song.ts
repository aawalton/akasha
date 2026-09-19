import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEyeOfTheNeedle = {
  id: "019ea4c5-e39e-7b42-9741-4a4d84dbd98b",
  type: "page-type/song",
  slug: "sia-eye-of-the-needle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce3a5aa4-11a2-4fa6-b084-268af0d52e97",
      externalLink: "https://musicbrainz.org/work/ce3a5aa4-11a2-4fa6-b084-268af0d52e97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eye of the Needle",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
