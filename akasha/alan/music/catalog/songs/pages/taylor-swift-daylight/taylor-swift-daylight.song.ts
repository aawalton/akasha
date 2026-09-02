import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDaylight = {
  id: "019ea416-174a-7404-92db-7373e1a9e82d",
  pageTypeSlug: "song",
  slug: "taylor-swift-daylight",
  title: "Daylight",
  artistSlug: "taylor-swift",
  externalId: "e42ffcfb-fd47-4f5c-8c04-fc94e0d92440",
  externalLink: "https://musicbrainz.org/work/e42ffcfb-fd47-4f5c-8c04-fc94e0d92440",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
