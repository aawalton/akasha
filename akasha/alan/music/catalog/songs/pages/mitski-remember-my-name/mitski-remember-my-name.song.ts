import type { Song } from "../../song.page-type.ts"

export const mitskiRememberMyName = {
  id: "019f0ea6-9648-7127-9dac-a4d4f85fab5c",
  pageTypeSlug: "song",
  slug: "mitski-remember-my-name",
  title: "Remember My Name",
  artistSlug: "mitski",
  externalId: "cc77f879-2c1f-450e-ab95-a7c1726de303",
  externalLink: "https://musicbrainz.org/work/cc77f879-2c1f-450e-ab95-a7c1726de303",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
