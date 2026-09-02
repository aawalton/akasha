import type { Song } from "../../song.page-type.ts"

export const mitskiEric = {
  id: "019f0ea3-44f4-780a-924e-827348aeb40a",
  pageTypeSlug: "song",
  slug: "mitski-eric",
  title: "Eric",
  artistSlug: "mitski",
  externalId: "861f4289-83ca-4df7-864e-0e9ff47434a0",
  externalLink: "https://musicbrainz.org/work/861f4289-83ca-4df7-864e-0e9ff47434a0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
