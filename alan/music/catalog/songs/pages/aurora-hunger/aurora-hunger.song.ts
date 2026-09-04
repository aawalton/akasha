import type { Song } from "../../song.page-type.ts"

export const auroraHunger = {
  id: "019ea4a7-88df-7ef0-b7d5-83b4d3253232",
  pageTypeSlug: "song",
  slug: "aurora-hunger",
  title: "Hunger",
  artistSlug: "aurora",
  externalId: "efa6d3c6-28ef-483c-9b17-f214e096fe24",
  externalLink: "https://musicbrainz.org/work/efa6d3c6-28ef-483c-9b17-f214e096fe24",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
