import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMaroon = {
  id: "019ea416-2125-7cb1-91d6-0174291052b2",
  pageTypeSlug: "song",
  slug: "taylor-swift-maroon",
  title: "Maroon",
  artistSlug: "taylor-swift",
  externalId: "6eae06ce-2d2a-4ce6-ba19-2017637adf08",
  externalLink: "https://musicbrainz.org/work/6eae06ce-2d2a-4ce6-ba19-2017637adf08",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
