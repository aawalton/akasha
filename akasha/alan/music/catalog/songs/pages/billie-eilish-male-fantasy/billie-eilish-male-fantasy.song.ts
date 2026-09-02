import type { Song } from "../../song.page-type.ts"

export const billieEilishMaleFantasy = {
  id: "019ea4a9-0951-7331-addb-f954ef3ccc53",
  pageTypeSlug: "song",
  slug: "billie-eilish-male-fantasy",
  title: "Male Fantasy",
  artistSlug: "billie-eilish",
  externalId: "3b8a5b19-468e-4e60-9c6d-c310bf4f755a",
  externalLink: "https://musicbrainz.org/work/3b8a5b19-468e-4e60-9c6d-c310bf4f755a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
