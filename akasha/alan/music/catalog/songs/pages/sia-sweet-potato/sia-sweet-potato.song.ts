import type { Song } from "../../song.page-type.ts"

export const siaSweetPotato = {
  id: "019ea4cd-9571-7198-8133-6e492baaf22c",
  pageTypeSlug: "song",
  slug: "sia-sweet-potato",
  title: "Sweet Potato",
  artistSlug: "sia",
  externalId: "ac395888-99c7-4572-aa34-f3ca96a29f41",
  externalLink: "https://musicbrainz.org/work/ac395888-99c7-4572-aa34-f3ca96a29f41",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
