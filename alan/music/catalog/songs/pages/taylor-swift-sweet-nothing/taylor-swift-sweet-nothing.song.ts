import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSweetNothing = {
  id: "019ea416-3d58-7bf1-b4c3-05df677cf8ac",
  pageTypeSlug: "song",
  slug: "taylor-swift-sweet-nothing",
  title: "Sweet Nothing",
  artistSlug: "taylor-swift",
  externalId: "d35b7694-9858-4026-bdd2-424f9e9ff528",
  externalLink: "https://musicbrainz.org/work/d35b7694-9858-4026-bdd2-424f9e9ff528",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
