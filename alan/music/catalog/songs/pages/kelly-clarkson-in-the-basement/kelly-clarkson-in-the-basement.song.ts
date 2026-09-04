import type { Song } from "../../song.page-type.ts"

export const kellyClarksonInTheBasement = {
  id: "019ea4af-4c9a-72b7-b0ca-9f404c844cec",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-in-the-basement",
  title: "In the Basement",
  artistSlug: "kelly-clarkson",
  externalId: "90fd65f3-e27d-46fe-9756-3690bb3ed1b5",
  externalLink: "https://musicbrainz.org/work/90fd65f3-e27d-46fe-9756-3690bb3ed1b5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
