import type { Song } from "../../song.page-type.ts"

export const mitskiInsteadOfHere = {
  id: "019f0ea4-8561-7cbf-b40a-c2038600bac2",
  pageTypeSlug: "song",
  slug: "mitski-instead-of-here",
  title: "Instead of Here",
  artistSlug: "mitski",
  externalId: "a398bae6-4d74-4ff0-8eed-8026b337bc3c",
  externalLink: "https://musicbrainz.org/work/a398bae6-4d74-4ff0-8eed-8026b337bc3c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
