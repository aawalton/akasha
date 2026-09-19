import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMyEverything = {
  id: "019ea4e6-2ba1-7ecf-8797-2e007d7c28ff",
  type: "page-type/song",
  slug: "ariana-grande-my-everything",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "82cf564f-5bdc-4f9e-bb7d-85a75ea247c2",
      externalLink: "https://musicbrainz.org/work/82cf564f-5bdc-4f9e-bb7d-85a75ea247c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Everything",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
