import type { Song } from "../../song.page-type.ts"

export const mitskiHappy = {
  id: "019f0ea3-fd5f-7c05-8ddd-62998db769f2",
  pageTypeSlug: "song",
  slug: "mitski-happy",
  title: "Happy",
  artistSlug: "mitski",
  externalId: "929b95e8-f06a-4dda-b7ff-0dd854318e30",
  externalLink: "https://musicbrainz.org/work/929b95e8-f06a-4dda-b7ff-0dd854318e30",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
