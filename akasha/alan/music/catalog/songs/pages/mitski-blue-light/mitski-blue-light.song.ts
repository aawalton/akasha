import type { Song } from "../../song.page-type.ts"

export const mitskiBlueLight = {
  id: "019f0e9d-11f4-7cad-b023-aa4a521ba28c",
  pageTypeSlug: "song",
  slug: "mitski-blue-light",
  title: "Blue Light",
  artistSlug: "mitski",
  externalId: "1990a898-c332-485a-a45d-541b54e42f3e",
  externalLink: "https://musicbrainz.org/work/1990a898-c332-485a-a45d-541b54e42f3e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
