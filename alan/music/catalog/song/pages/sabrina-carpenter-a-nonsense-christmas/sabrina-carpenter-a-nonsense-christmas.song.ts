import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterANonsenseChristmas = {
  id: "01a0b723-c30b-7d45-b222-0a01aaca2d1b",
  type: "page-type/song",
  slug: "sabrina-carpenter-a-nonsense-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "335d9590-ce55-491d-91a7-a119dadfc0c1",
      externalLink: "https://musicbrainz.org/work/335d9590-ce55-491d-91a7-a119dadfc0c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Nonsense Christmas",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
