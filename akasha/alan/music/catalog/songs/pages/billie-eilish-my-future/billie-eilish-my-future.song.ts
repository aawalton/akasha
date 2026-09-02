import type { Song } from "../../song.page-type.ts"

export const billieEilishMyFuture = {
  id: "019ea4aa-d53a-7f2a-9f3f-f3017019a99f",
  pageTypeSlug: "song",
  slug: "billie-eilish-my-future",
  title: "my future",
  artistSlug: "billie-eilish",
  externalId: "a8581db9-4f02-4b03-96ac-10cf405f672c",
  externalLink: "https://musicbrainz.org/work/a8581db9-4f02-4b03-96ac-10cf405f672c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
