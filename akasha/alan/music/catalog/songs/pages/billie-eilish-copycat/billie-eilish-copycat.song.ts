import type { Song } from "../../song.page-type.ts"

export const billieEilishCopycat = {
  id: "019ea4a8-df45-70b2-a966-191e360afa98",
  pageTypeSlug: "song",
  slug: "billie-eilish-copycat",
  title: "COPYCAT",
  artistSlug: "billie-eilish",
  externalId: "323d829b-80cb-4c16-89e0-f688b1f5f25c",
  externalLink: "https://musicbrainz.org/work/323d829b-80cb-4c16-89e0-f688b1f5f25c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
