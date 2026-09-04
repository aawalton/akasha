import type { Song } from "../../song.page-type.ts"

export const mitskiAbbey = {
  id: "019f0ea1-6e8b-78b1-b8ca-76ad280f6697",
  pageTypeSlug: "song",
  slug: "mitski-abbey",
  title: "Abbey",
  artistSlug: "mitski",
  externalId: "6a6c7967-2f7b-4a54-878b-bf04e06553e1",
  externalLink: "https://musicbrainz.org/work/6a6c7967-2f7b-4a54-878b-bf04e06553e1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
