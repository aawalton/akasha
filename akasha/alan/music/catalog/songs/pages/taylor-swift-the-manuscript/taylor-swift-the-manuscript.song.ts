import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheManuscript = {
  id: "019ea416-30b7-752a-b6dd-b2bccf30cd17",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-manuscript",
  title: "The Manuscript",
  artistSlug: "taylor-swift",
  externalId: "38a8256a-a297-494e-9f53-45f21715aa4b",
  externalLink: "https://musicbrainz.org/work/38a8256a-a297-494e-9f53-45f21715aa4b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
