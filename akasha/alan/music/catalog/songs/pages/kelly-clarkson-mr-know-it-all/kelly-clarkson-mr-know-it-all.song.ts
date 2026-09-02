import type { Song } from "../../song.page-type.ts"

export const kellyClarksonMrKnowItAll = {
  id: "019ea4ae-d4df-7b25-968d-11b1e5461fc0",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-mr-know-it-all",
  title: "Mr. Know It All",
  artistSlug: "kelly-clarkson",
  externalId: "6f79a4d5-d30d-4915-8cfa-538cb0507953",
  externalLink: "https://musicbrainz.org/work/6f79a4d5-d30d-4915-8cfa-538cb0507953",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
