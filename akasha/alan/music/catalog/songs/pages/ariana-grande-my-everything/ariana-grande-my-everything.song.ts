import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMyEverything = {
  id: "019ea4e6-2ba1-7ecf-8797-2e007d7c28ff",
  pageTypeSlug: "song",
  slug: "ariana-grande-my-everything",
  title: "My Everything",
  artistSlug: "ariana-grande",
  externalId: "82cf564f-5bdc-4f9e-bb7d-85a75ea247c2",
  externalLink: "https://musicbrainz.org/work/82cf564f-5bdc-4f9e-bb7d-85a75ea247c2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
