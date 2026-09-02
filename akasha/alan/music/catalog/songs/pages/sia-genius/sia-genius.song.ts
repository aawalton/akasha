import type { Song } from "../../song.page-type.ts"

export const siaGenius = {
  id: "019ea4ca-1535-7484-9795-9d7b51dc8256",
  pageTypeSlug: "song",
  slug: "sia-genius",
  title: "Genius",
  artistSlug: "sia",
  externalId: "de51a8e6-74ec-4ab2-acc7-b28e7224f5d9",
  externalLink: "https://musicbrainz.org/work/de51a8e6-74ec-4ab2-acc7-b28e7224f5d9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
