import type { Song } from "../../song.page-type.ts"

export const taylorSwiftStarlight = {
  id: "019ea416-2fe7-7987-999e-62de3f5814ac",
  pageTypeSlug: "song",
  slug: "taylor-swift-starlight",
  title: "Starlight",
  artistSlug: "taylor-swift",
  externalId: "221e6743-fe3c-4a92-af46-112a2462169f",
  externalLink: "https://musicbrainz.org/work/221e6743-fe3c-4a92-af46-112a2462169f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
