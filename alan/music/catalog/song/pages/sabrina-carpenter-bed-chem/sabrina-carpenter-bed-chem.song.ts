import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBedChem = {
  id: "01a0b723-c1a9-71ab-aeab-06c783d309e3",
  type: "page-type/song",
  slug: "sabrina-carpenter-bed-chem",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27019b04-c940-4861-9544-401bb905ec25",
      externalLink: "https://musicbrainz.org/work/27019b04-c940-4861-9544-401bb905ec25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bed Chem",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
