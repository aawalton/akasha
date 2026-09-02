import type { Song } from "../../song.page-type.ts"

export const auroraTheRiver = {
  id: "019ea4a4-9d12-79f8-8af2-c03a4cc3704e",
  pageTypeSlug: "song",
  slug: "aurora-the-river",
  title: "The River",
  artistSlug: "aurora",
  externalId: "495d41e1-4bbd-4571-bf81-42013d0e842e",
  externalLink: "https://musicbrainz.org/work/495d41e1-4bbd-4571-bf81-42013d0e842e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
