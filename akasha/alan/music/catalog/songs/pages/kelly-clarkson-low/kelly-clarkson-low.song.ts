import type { Song } from "../../song.page-type.ts"

export const kellyClarksonLow = {
  id: "019ea4af-5519-725a-9c96-2a3515168a37",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-low",
  title: "Low",
  artistSlug: "kelly-clarkson",
  externalId: "91c516a7-f6c7-466d-83dc-75e7be3d3f5c",
  externalLink: "https://musicbrainz.org/work/91c516a7-f6c7-466d-83dc-75e7be3d3f5c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
