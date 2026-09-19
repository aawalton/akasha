import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterNonsense = {
  id: "01a0b723-c0ab-7a75-8d9d-3cd47317461e",
  type: "page-type/song",
  slug: "sabrina-carpenter-nonsense",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16b899e1-6839-499f-8aae-d0e3fc9ff25e",
      externalLink: "https://musicbrainz.org/work/16b899e1-6839-499f-8aae-d0e3fc9ff25e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nonsense",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
