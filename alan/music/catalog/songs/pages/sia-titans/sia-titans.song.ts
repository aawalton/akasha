import type { Song } from "../../song.page-type.types.ts"

export const siaTitans = {
  id: "019ea4cb-e894-7825-8951-07fafd56d8b3",
  pageTypeSlug: "song",
  type: "song",
  slug: "sia-titans",
  title: "Titans",
  artist: "sia",
  externalId: "3dc9008a-b2aa-4c6f-b805-f6af8dad118e",
  externalLink: "https://musicbrainz.org/work/3dc9008a-b2aa-4c6f-b805-f6af8dad118e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
