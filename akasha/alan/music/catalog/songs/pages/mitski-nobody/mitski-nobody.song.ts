import type { Song } from "../../song.page-type.ts"

export const mitskiNobody = {
  id: "019f0ea7-528c-7000-9a20-65d8ae05c840",
  pageTypeSlug: "song",
  slug: "mitski-nobody",
  title: "Nobody",
  artistSlug: "mitski",
  externalId: "dbc6799a-51de-45de-a7a8-c0d18e718881",
  externalLink: "https://musicbrainz.org/work/dbc6799a-51de-45de-a7a8-c0d18e718881",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
