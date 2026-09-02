import type { Song } from "../../song.page-type.ts"

export const imagineDragonsSymphony = {
  id: "019ea49c-12a1-747d-92fd-181fc1abf24e",
  pageTypeSlug: "song",
  slug: "imagine-dragons-symphony",
  title: "Symphony",
  artistSlug: "imagine-dragons",
  externalId: "4f45a75e-d5d2-4d9a-8022-5723e680c882",
  externalLink: "https://musicbrainz.org/work/4f45a75e-d5d2-4d9a-8022-5723e680c882",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
