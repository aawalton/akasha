import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheLuckyOne = {
  id: "019ea416-3918-785a-bb62-5d132a77ab2b",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-lucky-one",
  title: "The Lucky One",
  artistSlug: "taylor-swift",
  externalId: "96699523-dcc9-448e-885f-77770dab89c8",
  externalLink: "https://musicbrainz.org/work/96699523-dcc9-448e-885f-77770dab89c8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
