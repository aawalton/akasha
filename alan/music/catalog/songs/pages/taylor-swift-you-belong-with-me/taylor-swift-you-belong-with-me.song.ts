import type { Song } from "../../song.page-type.ts"

export const taylorSwiftYouBelongWithMe = {
  id: "019ea416-456d-79b3-9f81-296b185f8212",
  pageTypeSlug: "song",
  slug: "taylor-swift-you-belong-with-me",
  title: "You Belong with Me",
  artistSlug: "taylor-swift",
  externalId: "4f0b6123-2bbd-3672-a928-b1949a42654d",
  externalLink: "https://musicbrainz.org/work/4f0b6123-2bbd-3672-a928-b1949a42654d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
