import type { Song } from "../../song.page-type.ts"

export const taylorSwiftCowboyLikeMe = {
  id: "019ea416-07b2-7ea6-a732-8640cdf82cb5",
  pageTypeSlug: "song",
  slug: "taylor-swift-cowboy-like-me",
  title: "cowboy like me",
  artistSlug: "taylor-swift",
  externalId: "4533b239-8893-42c9-8d01-70eea8d298c6",
  externalLink: "https://musicbrainz.org/work/4533b239-8893-42c9-8d01-70eea8d298c6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
