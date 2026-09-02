import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSuperstar = {
  id: "019ea416-3486-7055-bba2-b8a0e132c088",
  pageTypeSlug: "song",
  slug: "taylor-swift-superstar",
  title: "SuperStar",
  artistSlug: "taylor-swift",
  externalId: "5917a7e3-a22b-4d25-b3ef-ff1f47e47f93",
  externalLink: "https://musicbrainz.org/work/5917a7e3-a22b-4d25-b3ef-ff1f47e47f93",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
