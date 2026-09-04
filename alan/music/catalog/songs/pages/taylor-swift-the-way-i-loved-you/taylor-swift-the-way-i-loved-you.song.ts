import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheWayILovedYou = {
  id: "019ea416-4a42-7c41-8196-5734e2d381a2",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-way-i-loved-you",
  title: "The Way I Loved You",
  artistSlug: "taylor-swift",
  externalId: "bbd98f0f-98d6-34b0-b927-55dff9c1b8eb",
  externalLink: "https://musicbrainz.org/work/bbd98f0f-98d6-34b0-b927-55dff9c1b8eb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
