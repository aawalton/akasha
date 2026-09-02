import type { Song } from "../../song.page-type.ts"

export const mitskiEveryone = {
  id: "019f0e9f-8f71-7386-867a-bba9bd0a9e64",
  pageTypeSlug: "song",
  slug: "mitski-everyone",
  title: "Everyone",
  artistSlug: "mitski",
  externalId: "440f7d3e-8304-4a8c-acf9-4d97fbb52328",
  externalLink: "https://musicbrainz.org/work/440f7d3e-8304-4a8c-acf9-4d97fbb52328",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
