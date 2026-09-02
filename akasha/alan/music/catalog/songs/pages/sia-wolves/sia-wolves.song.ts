import type { Song } from "../../song.page-type.ts"

export const siaWolves = {
  id: "019ea4cb-3247-7881-ae1b-fdb2b630fed2",
  pageTypeSlug: "song",
  slug: "sia-wolves",
  title: "Wolves",
  artistSlug: "sia",
  externalId: "26022377-f20c-4d6b-b465-74b9f157c084",
  externalLink: "https://musicbrainz.org/work/26022377-f20c-4d6b-b465-74b9f157c084",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
