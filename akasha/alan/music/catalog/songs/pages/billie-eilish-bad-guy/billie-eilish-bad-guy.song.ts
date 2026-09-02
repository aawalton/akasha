import type { Song } from "../../song.page-type.ts"

export const billieEilishBadGuy = {
  id: "019ea4a8-50ae-7eba-9f20-55aa2117c8b4",
  pageTypeSlug: "song",
  slug: "billie-eilish-bad-guy",
  title: "bad guy",
  artistSlug: "billie-eilish",
  externalId: "06c9031d-476f-4d08-be46-72fc581cbe6a",
  externalLink: "https://musicbrainz.org/work/06c9031d-476f-4d08-be46-72fc581cbe6a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
