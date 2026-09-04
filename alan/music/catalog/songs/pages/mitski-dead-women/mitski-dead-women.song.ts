import type { Song } from "../../song.page-type.ts"

export const mitskiDeadWomen = {
  id: "019f0ea4-e5d2-7760-b243-207a87beffdb",
  pageTypeSlug: "song",
  slug: "mitski-dead-women",
  title: "Dead Women",
  artistSlug: "mitski",
  externalId: "af80f7b8-0368-4fa9-a6f7-3091b486ec1d",
  externalLink: "https://musicbrainz.org/work/af80f7b8-0368-4fa9-a6f7-3091b486ec1d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
