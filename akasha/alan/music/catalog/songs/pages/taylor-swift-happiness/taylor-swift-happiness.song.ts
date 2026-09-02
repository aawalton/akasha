import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHappiness = {
  id: "019ea416-2721-7182-857d-aa1fac6ddf98",
  pageTypeSlug: "song",
  slug: "taylor-swift-happiness",
  title: "happiness",
  artistSlug: "taylor-swift",
  externalId: "a4b2e081-39fb-4aa5-a43e-df28c29bcf4d",
  externalLink: "https://musicbrainz.org/work/a4b2e081-39fb-4aa5-a43e-df28c29bcf4d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
