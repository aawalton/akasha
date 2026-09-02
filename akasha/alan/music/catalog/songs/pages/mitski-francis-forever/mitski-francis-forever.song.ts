import type { Song } from "../../song.page-type.ts"

export const mitskiFrancisForever = {
  id: "019f0e9c-cfe1-72b9-9447-a0bf20be179b",
  pageTypeSlug: "song",
  slug: "mitski-francis-forever",
  title: "Francis Forever",
  artistSlug: "mitski",
  externalId: "17e2835b-67e8-41a9-a118-5968268fa04d",
  externalLink: "https://musicbrainz.org/work/17e2835b-67e8-41a9-a118-5968268fa04d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
