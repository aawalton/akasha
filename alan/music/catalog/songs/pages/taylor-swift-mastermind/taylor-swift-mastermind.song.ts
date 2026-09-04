import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMastermind = {
  id: "019ea416-2526-7682-b105-33902152c3f5",
  pageTypeSlug: "song",
  slug: "taylor-swift-mastermind",
  title: "Mastermind",
  artistSlug: "taylor-swift",
  externalId: "9a345806-abf4-468f-b792-529848c28251",
  externalLink: "https://musicbrainz.org/work/9a345806-abf4-468f-b792-529848c28251",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "A",
  tags: ["wanted"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
