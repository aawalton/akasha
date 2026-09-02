import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHeyStephen = {
  id: "019ea416-223b-7053-b583-1bc4afcb6b45",
  pageTypeSlug: "song",
  slug: "taylor-swift-hey-stephen",
  title: "Hey Stephen",
  artistSlug: "taylor-swift",
  externalId: "7d7c1db7-b29f-34fd-be71-37f18021307c",
  externalLink: "https://musicbrainz.org/work/7d7c1db7-b29f-34fd-be71-37f18021307c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
