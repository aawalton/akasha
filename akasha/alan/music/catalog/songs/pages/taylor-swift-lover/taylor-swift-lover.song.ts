import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLover = {
  id: "019ea416-2d40-7d6a-b361-dd68f34932a8",
  pageTypeSlug: "song",
  slug: "taylor-swift-lover",
  title: "Lover",
  artistSlug: "taylor-swift",
  externalId: "fbfa8834-ff6c-4279-a134-130650ad2c25",
  externalLink: "https://musicbrainz.org/work/fbfa8834-ff6c-4279-a134-130650ad2c25",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
