import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBadBlood = {
  id: "019ea416-1405-7467-bcef-3a7c3a063767",
  pageTypeSlug: "song",
  slug: "taylor-swift-bad-blood",
  title: "Bad Blood",
  artistSlug: "taylor-swift",
  externalId: "c23570a3-467c-4ee8-80ff-0a04b339e844",
  externalLink: "https://musicbrainz.org/work/c23570a3-467c-4ee8-80ff-0a04b339e844",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
