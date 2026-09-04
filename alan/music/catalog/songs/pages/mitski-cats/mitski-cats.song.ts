import type { Song } from "../../song.page-type.ts"

export const mitskiCats = {
  id: "019f0ea2-56b9-7b06-84c9-714e275f5c4d",
  pageTypeSlug: "song",
  slug: "mitski-cats",
  title: "Cats",
  artistSlug: "mitski",
  externalId: "7b7dbb7b-9f39-44c9-ae6a-d5aee7b28f99",
  externalLink: "https://musicbrainz.org/work/7b7dbb7b-9f39-44c9-ae6a-d5aee7b28f99",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
