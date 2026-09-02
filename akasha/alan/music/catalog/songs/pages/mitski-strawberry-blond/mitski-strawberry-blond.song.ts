import type { Song } from "../../song.page-type.ts"

export const mitskiStrawberryBlond = {
  id: "019f0e9f-4c40-74ec-8075-ac8393078c49",
  pageTypeSlug: "song",
  slug: "mitski-strawberry-blond",
  title: "Strawberry Blond",
  artistSlug: "mitski",
  externalId: "3f4f96c3-4523-4313-8749-f461f802c3cb",
  externalLink: "https://musicbrainz.org/work/3f4f96c3-4523-4313-8749-f461f802c3cb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
