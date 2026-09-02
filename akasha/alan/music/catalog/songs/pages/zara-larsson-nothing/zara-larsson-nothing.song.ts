import type { Song } from "../../song.page-type.ts"

export const zaraLarssonNothing = {
  id: "019ea4a1-19fd-72bf-a343-89d95680d6e7",
  pageTypeSlug: "song",
  slug: "zara-larsson-nothing",
  title: "Nothing",
  artistSlug: "zara-larsson",
  externalId: "bb0b2ae3-5f24-4860-a803-034dfa8f3c66",
  externalLink: "https://musicbrainz.org/work/bb0b2ae3-5f24-4860-a803-034dfa8f3c66",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
