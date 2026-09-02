import type { Song } from "../../song.page-type.ts"

export const arianaGrandeZeroToHero = {
  id: "019ea4e8-c8d6-70b4-8a3e-6a13b7ac52d2",
  pageTypeSlug: "song",
  slug: "ariana-grande-zero-to-hero",
  title: "Zero to Hero",
  artistSlug: "ariana-grande",
  externalId: "b5dbac6b-b842-3ab6-8882-a24426270e99",
  externalLink: "https://musicbrainz.org/work/b5dbac6b-b842-3ab6-8882-a24426270e99",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
