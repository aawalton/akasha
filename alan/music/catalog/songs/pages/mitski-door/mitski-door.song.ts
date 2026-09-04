import type { Song } from "../../song.page-type.ts"

export const mitskiDoor = {
  id: "019f0ea6-af48-70b4-b893-2f5d475955fb",
  pageTypeSlug: "song",
  slug: "mitski-door",
  title: "Door",
  artistSlug: "mitski",
  externalId: "d49e9332-88ce-4bb2-80cb-5a430604ab23",
  externalLink: "https://musicbrainz.org/work/d49e9332-88ce-4bb2-80cb-5a430604ab23",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
