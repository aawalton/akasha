import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBetterMan = {
  id: "019ea416-08a5-7fef-bbed-efa47d750123",
  pageTypeSlug: "song",
  slug: "taylor-swift-better-man",
  title: "Better Man",
  artistSlug: "taylor-swift",
  externalId: "53c4e7af-7028-4412-9d38-d10990de808c",
  externalLink: "https://musicbrainz.org/work/53c4e7af-7028-4412-9d38-d10990de808c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
