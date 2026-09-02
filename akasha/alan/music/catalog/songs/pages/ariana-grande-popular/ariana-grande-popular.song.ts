import type { Song } from "../../song.page-type.ts"

export const arianaGrandePopular = {
  id: "019ea4e4-212f-7943-af1c-e64ecccd2cb4",
  pageTypeSlug: "song",
  slug: "ariana-grande-popular",
  title: "Popular",
  artistSlug: "ariana-grande",
  externalId: "15953bcf-9ab2-3dc5-8f74-477eb6766122",
  externalLink: "https://musicbrainz.org/work/15953bcf-9ab2-3dc5-8f74-477eb6766122",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
