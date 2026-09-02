import type { Song } from "../../song.page-type.ts"

export const mitskiStaySoft = {
  id: "019f0e9e-80ae-7705-98e2-e2e8d6ed9ad2",
  pageTypeSlug: "song",
  slug: "mitski-stay-soft",
  title: "Stay Soft",
  artistSlug: "mitski",
  externalId: "341751bd-93fd-4d60-a8be-0587a2c5c232",
  externalLink: "https://musicbrainz.org/work/341751bd-93fd-4d60-a8be-0587a2c5c232",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
