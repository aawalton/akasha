import type { Song } from "../../song.page-type.ts"

export const mitskiPinkInTheNight = {
  id: "019f0e9f-70ed-7c63-806a-90e4d5fdb357",
  pageTypeSlug: "song",
  slug: "mitski-pink-in-the-night",
  title: "Pink in the Night",
  artistSlug: "mitski",
  externalId: "41e141d0-7d35-42f1-b844-7bb45c0948ba",
  externalLink: "https://musicbrainz.org/work/41e141d0-7d35-42f1-b844-7bb45c0948ba",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
