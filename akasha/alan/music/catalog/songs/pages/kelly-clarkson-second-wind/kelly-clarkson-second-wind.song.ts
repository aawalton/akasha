import type { Song } from "../../song.page-type.ts"

export const kellyClarksonSecondWind = {
  id: "019ea4b1-6274-77d2-9e28-ba2410731e12",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-second-wind",
  title: "Second Wind",
  artistSlug: "kelly-clarkson",
  externalId: "0d542b3a-7e10-4188-af4c-b4fe28cc7a03",
  externalLink: "https://musicbrainz.org/work/0d542b3a-7e10-4188-af4c-b4fe28cc7a03",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
