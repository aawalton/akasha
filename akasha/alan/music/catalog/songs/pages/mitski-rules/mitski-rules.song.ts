import type { Song } from "../../song.page-type.ts"

export const mitskiRules = {
  id: "019f0ea0-70d4-79ce-9112-7973da822917",
  pageTypeSlug: "song",
  slug: "mitski-rules",
  title: "Rules",
  artistSlug: "mitski",
  externalId: "50d50df4-9f89-41bf-857f-3cbc4c178aed",
  externalLink: "https://musicbrainz.org/work/50d50df4-9f89-41bf-857f-3cbc4c178aed",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
