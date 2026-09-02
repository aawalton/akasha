import type { Song } from "../../song.page-type.ts"

export const taylorSwiftAPlaceInThisWorld = {
  id: "019ea416-133a-7a88-8de0-71f90ffc0e84",
  pageTypeSlug: "song",
  slug: "taylor-swift-a-place-in-this-world",
  title: "A Place in This World",
  artistSlug: "taylor-swift",
  externalId: "ba20038f-12ee-4c46-a31b-03e64358c36f",
  externalLink: "https://musicbrainz.org/work/ba20038f-12ee-4c46-a31b-03e64358c36f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
