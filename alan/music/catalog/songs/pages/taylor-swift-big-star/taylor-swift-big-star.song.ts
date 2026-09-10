import type { Song } from "../../song.page-type.types.ts"

export const taylorSwiftBigStar = {
  id: "019ea416-0c47-79e3-a65c-651f6e4d73d0",
  pageTypeSlug: "song",
  type: "song",
  slug: "taylor-swift-big-star",
  title: "Big Star",
  artist: "taylor-swift",
  externalId: "782535fa-fe6e-4279-a351-2bfefd864fc1",
  externalLink: "https://musicbrainz.org/work/782535fa-fe6e-4279-a351-2bfefd864fc1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
