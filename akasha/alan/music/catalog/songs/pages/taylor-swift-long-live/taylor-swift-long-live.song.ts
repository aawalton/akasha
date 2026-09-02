import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLongLive = {
  id: "019ea416-188f-7c6a-b237-d24d07752d5a",
  pageTypeSlug: "song",
  slug: "taylor-swift-long-live",
  title: "Long Live",
  artistSlug: "taylor-swift",
  externalId: "0730d63b-e621-43de-9cdf-d6906db2f7b7",
  externalLink: "https://musicbrainz.org/work/0730d63b-e621-43de-9cdf-d6906db2f7b7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
