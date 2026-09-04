import type { Song } from "../../song.page-type.ts"

export const siaSnowman = {
  id: "019ea4cd-1247-773e-b10d-ff901d7b7d40",
  pageTypeSlug: "song",
  slug: "sia-snowman",
  title: "Snowman",
  artistSlug: "sia",
  externalId: "8bf233e5-34a6-48b1-839b-0766fe32c666",
  externalLink: "https://musicbrainz.org/work/8bf233e5-34a6-48b1-839b-0766fe32c666",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
