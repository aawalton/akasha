import type { Song } from "../../song.page-type.ts"

export const billieEilishPartyFavor = {
  id: "019ea4ab-b15e-79ce-a710-f26ec941014f",
  pageTypeSlug: "song",
  slug: "billie-eilish-party-favor",
  title: "party favor",
  artistSlug: "billie-eilish",
  externalId: "dddb35b2-d2fc-4910-85cb-493063450de4",
  externalLink: "https://musicbrainz.org/work/dddb35b2-d2fc-4910-85cb-493063450de4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
