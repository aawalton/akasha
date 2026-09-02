import type { Song } from "../../song.page-type.ts"

export const billieEilishOverheated = {
  id: "019ea4a8-58aa-7ac5-8e77-6e1e92014724",
  pageTypeSlug: "song",
  slug: "billie-eilish-overheated",
  title: "OverHeated",
  artistSlug: "billie-eilish",
  externalId: "08baf83f-789d-4eed-977f-67c193156e7a",
  externalLink: "https://musicbrainz.org/work/08baf83f-789d-4eed-977f-67c193156e7a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
