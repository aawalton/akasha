import type { Song } from "../../song.page-type.ts"

export const siaSomersault = {
  id: "019ea4cd-3455-7667-9031-4c40f186d188",
  pageTypeSlug: "song",
  slug: "sia-somersault",
  title: "Somersault",
  artistSlug: "sia",
  externalId: "9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
  externalLink: "https://musicbrainz.org/work/9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
