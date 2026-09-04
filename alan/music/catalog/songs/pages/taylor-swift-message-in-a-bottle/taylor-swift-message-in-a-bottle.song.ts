import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMessageInABottle = {
  id: "019ea416-1ab8-7193-adee-760f43754a0f",
  pageTypeSlug: "song",
  slug: "taylor-swift-message-in-a-bottle",
  title: "Message in a Bottle",
  artistSlug: "taylor-swift",
  externalId: "1945ae41-efeb-4569-b8e2-e4fd5cf7812f",
  externalLink: "https://musicbrainz.org/work/1945ae41-efeb-4569-b8e2-e4fd5cf7812f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
