import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheLakes = {
  id: "019ea416-3852-750f-a526-ff2e1cb043db",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-lakes",
  title: "the lakes",
  artistSlug: "taylor-swift",
  externalId: "7cf336af-9d60-4b9d-9c99-82e86fc7a8e3",
  externalLink: "https://musicbrainz.org/work/7cf336af-9d60-4b9d-9c99-82e86fc7a8e3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
