import type { Song } from "../../song.page-type.ts"

export const kellyClarksonTimeless = {
  id: "019ea4c1-9231-7fd7-90c7-5dfea1d8872e",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-timeless",
  title: "Timeless",
  artistSlug: "kelly-clarkson",
  externalId: "f622d118-01c1-3696-ae9d-96d719e6dddb",
  externalLink: "https://musicbrainz.org/work/f622d118-01c1-3696-ae9d-96d719e6dddb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
