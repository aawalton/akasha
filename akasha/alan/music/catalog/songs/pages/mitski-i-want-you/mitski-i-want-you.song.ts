import type { Song } from "../../song.page-type.ts"

export const mitskiIWantYou = {
  id: "019f0ea1-9269-7559-a728-5a08daadd92c",
  pageTypeSlug: "song",
  slug: "mitski-i-want-you",
  title: "I Want You",
  artistSlug: "mitski",
  externalId: "6f0dbf8f-4f7a-49c8-8154-a7fe115b6e9d",
  externalLink: "https://musicbrainz.org/work/6f0dbf8f-4f7a-49c8-8154-a7fe115b6e9d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
