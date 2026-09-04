import type { Song } from "../../song.page-type.ts"

export const billieEilishThe30th = {
  id: "019ea4a9-a317-7266-b910-47ce6080ec29",
  pageTypeSlug: "song",
  slug: "billie-eilish-the-30th",
  title: "The 30th",
  artistSlug: "billie-eilish",
  externalId: "5f6dfe98-2c2c-41dc-b54b-677740858c3e",
  externalLink: "https://musicbrainz.org/work/5f6dfe98-2c2c-41dc-b54b-677740858c3e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
