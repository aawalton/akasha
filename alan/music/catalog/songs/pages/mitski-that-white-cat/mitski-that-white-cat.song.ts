import type { Song } from "../../song.page-type.types.ts"

export const mitskiThatWhiteCat = {
  id: "019f0ea7-6b80-7369-a6b2-b898e5d750c3",
  pageTypeSlug: "song",
  type: "song",
  slug: "mitski-that-white-cat",
  title: "That White Cat",
  artist: "mitski",
  externalId: "e02269e0-55fa-4591-9006-231155443fa1",
  externalLink: "https://musicbrainz.org/work/e02269e0-55fa-4591-9006-231155443fa1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
