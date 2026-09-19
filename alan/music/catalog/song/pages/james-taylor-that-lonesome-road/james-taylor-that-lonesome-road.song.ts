import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThatLonesomeRoad = {
  id: "01a0b72f-55d8-708c-bffc-a90ce1b82234",
  type: "page-type/song",
  slug: "james-taylor-that-lonesome-road",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ccec141d-eb56-4242-bde3-1db4c9973f4d",
      externalLink: "https://musicbrainz.org/work/ccec141d-eb56-4242-bde3-1db4c9973f4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That Lonesome Road",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
