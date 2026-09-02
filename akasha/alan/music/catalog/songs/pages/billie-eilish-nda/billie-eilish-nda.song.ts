import type { Song } from "../../song.page-type.ts"

export const billieEilishNda = {
  id: "019ea4aa-b875-7160-bfc6-703216e83acf",
  pageTypeSlug: "song",
  slug: "billie-eilish-nda",
  title: "NDA",
  artistSlug: "billie-eilish",
  externalId: "991938e8-cbe0-4f93-bdcb-c161cfc3d695",
  externalLink: "https://musicbrainz.org/work/991938e8-cbe0-4f93-bdcb-c161cfc3d695",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
