import type { Song } from "../../song.page-type.ts"

export const mitskiThisIsALife = {
  id: "019f0ea6-109b-74fc-a7e7-91960f1fa7f7",
  pageTypeSlug: "song",
  slug: "mitski-this-is-a-life",
  title: "This Is a Life",
  artistSlug: "mitski",
  externalId: "c292148d-3381-4a01-a32d-b061397877da",
  externalLink: "https://musicbrainz.org/work/c292148d-3381-4a01-a32d-b061397877da",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
