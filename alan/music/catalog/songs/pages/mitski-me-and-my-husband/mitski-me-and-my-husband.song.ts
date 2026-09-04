import type { Song } from "../../song.page-type.ts"

export const mitskiMeAndMyHusband = {
  id: "019f0ea5-4147-7a28-8f77-ff8e1ad6d708",
  pageTypeSlug: "song",
  slug: "mitski-me-and-my-husband",
  title: "Me and My Husband",
  artistSlug: "mitski",
  externalId: "b4dd6bd5-c2d6-45c1-ad96-86942897745e",
  externalLink: "https://musicbrainz.org/work/b4dd6bd5-c2d6-45c1-ad96-86942897745e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
