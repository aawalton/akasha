import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBye = {
  id: "019ea4e2-63fc-7d1c-8bc8-987ab9f3b729",
  pageTypeSlug: "song",
  slug: "ariana-grande-bye",
  title: "bye",
  artistSlug: "ariana-grande",
  externalId: "92f286f7-2d62-42c9-8256-ff7e842ed10a",
  externalLink: "https://musicbrainz.org/work/92f286f7-2d62-42c9-8256-ff7e842ed10a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
