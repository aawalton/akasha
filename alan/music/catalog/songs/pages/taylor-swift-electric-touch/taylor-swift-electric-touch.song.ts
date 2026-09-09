import type { Song } from "../../song.page-type.ts"

export const taylorSwiftElectricTouch = {
  id: "019ea416-068b-7e98-9da3-d749fb6639bb",
  pageTypeSlug: "song",
  type: "song",
  slug: "taylor-swift-electric-touch",
  title: "Electric Touch",
  artist: "taylor-swift",
  externalId: "3d7f6e77-f875-4238-a633-2b8d89b497d7",
  externalLink: "https://musicbrainz.org/work/3d7f6e77-f875-4238-a633-2b8d89b497d7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
