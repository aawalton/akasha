import type { Song } from "../../song.page-type.ts"

export const kellyClarksonSomeone = {
  id: "019ea4c1-0591-7c0b-83f2-cc909c49d1f8",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-someone",
  title: "Someone",
  artistSlug: "kelly-clarkson",
  externalId: "a41f929d-894a-4503-bc89-65b115401ab3",
  externalLink: "https://musicbrainz.org/work/a41f929d-894a-4503-bc89-65b115401ab3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
