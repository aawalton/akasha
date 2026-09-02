import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWonderland = {
  id: "019ea416-4bdd-78c2-8fda-8a0c4dc52a45",
  pageTypeSlug: "song",
  slug: "taylor-swift-wonderland",
  title: "Wonderland",
  artistSlug: "taylor-swift",
  externalId: "f29d46db-d630-4778-a071-de8f3d5fdff2",
  externalLink: "https://musicbrainz.org/work/f29d46db-d630-4778-a071-de8f3d5fdff2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
