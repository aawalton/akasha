import type { Song } from "../../song.page-type.ts"

export const arianaGrandeEverytime = {
  id: "019ea4e1-640e-7c19-ad50-12cedc034101",
  pageTypeSlug: "song",
  slug: "ariana-grande-everytime",
  title: "everytime",
  artistSlug: "ariana-grande",
  externalId: "59ec0a26-1487-4ab1-b30e-1127c769aae4",
  externalLink: "https://musicbrainz.org/work/59ec0a26-1487-4ab1-b30e-1127c769aae4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
