import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBoyfriend = {
  id: "019ea4e1-cdbd-77ec-ad11-79b7e796d271",
  pageTypeSlug: "song",
  slug: "ariana-grande-boyfriend",
  title: "boyfriend",
  artistSlug: "ariana-grande",
  externalId: "72d58b76-1f7d-4a46-a331-19a1e94cbf05",
  externalLink: "https://musicbrainz.org/work/72d58b76-1f7d-4a46-a331-19a1e94cbf05",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
