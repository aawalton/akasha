import type { Song } from "../../song.page-type.ts"

export const taylorSwiftICanSeeYou = {
  id: "019ea416-22de-7d3e-b2a8-a0ae55bb30fa",
  pageTypeSlug: "song",
  slug: "taylor-swift-i-can-see-you",
  title: "I Can See You",
  artistSlug: "taylor-swift",
  externalId: "874bdda9-5917-40d8-85a1-7279ae103ea1",
  externalLink: "https://musicbrainz.org/work/874bdda9-5917-40d8-85a1-7279ae103ea1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
