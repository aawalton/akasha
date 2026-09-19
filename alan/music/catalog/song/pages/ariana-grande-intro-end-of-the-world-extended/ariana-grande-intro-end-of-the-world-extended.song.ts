import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIntroEndOfTheWorldExtended = {
  id: "01a0ba8d-6dff-7618-b083-28402876edd6",
  type: "page-type/song",
  slug: "ariana-grande-intro-end-of-the-world-extended",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "68174bbb-a335-4ba1-8303-89905ea79707",
      externalLink: "https://musicbrainz.org/work/68174bbb-a335-4ba1-8303-89905ea79707",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "intro (end of the world) (extended)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
