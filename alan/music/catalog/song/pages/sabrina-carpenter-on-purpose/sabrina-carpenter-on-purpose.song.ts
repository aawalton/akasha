import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterOnPurpose = {
  id: "01a0b723-ce1d-75fb-a185-37dcc44386a5",
  type: "page-type/song",
  slug: "sabrina-carpenter-on-purpose",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "de592c1b-c010-4ecd-8207-3d7d021e5e94",
      externalLink: "https://musicbrainz.org/work/de592c1b-c010-4ecd-8207-3d7d021e5e94",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On Purpose",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
