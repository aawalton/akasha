import type { Song } from "../../song.page-type.ts"

export const mitskiBrandNewCity = {
  id: "019f0e9f-1461-7019-beea-50390af32b0c",
  pageTypeSlug: "song",
  slug: "mitski-brand-new-city",
  title: "Brand New City",
  artistSlug: "mitski",
  externalId: "3e0483f2-fe06-47d0-b526-8618d17e83c5",
  externalLink: "https://musicbrainz.org/work/3e0483f2-fe06-47d0-b526-8618d17e83c5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
