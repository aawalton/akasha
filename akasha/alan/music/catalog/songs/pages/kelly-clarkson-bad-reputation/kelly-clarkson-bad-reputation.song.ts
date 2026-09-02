import type { Song } from "../../song.page-type.ts"

export const kellyClarksonBadReputation = {
  id: "019ea4ad-4b34-72e4-ad26-aacab4aff8a9",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-bad-reputation",
  title: "Bad Reputation",
  artistSlug: "kelly-clarkson",
  externalId: "23eb9cc3-fedf-40f8-9160-54b87f870ac4",
  externalLink: "https://musicbrainz.org/work/23eb9cc3-fedf-40f8-9160-54b87f870ac4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
