import type { Song } from "../../song.page-type.ts"

export const arianaGrandeImperfectForYou = {
  id: "019ea4e0-b52b-7333-bc4b-e96442e5572d",
  pageTypeSlug: "song",
  slug: "ariana-grande-imperfect-for-you",
  title: "imperfect for you",
  artistSlug: "ariana-grande",
  externalId: "203efb6c-2edf-41ce-bd0b-9ba4f399f1c1",
  externalLink: "https://musicbrainz.org/work/203efb6c-2edf-41ce-bd0b-9ba4f399f1c1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
