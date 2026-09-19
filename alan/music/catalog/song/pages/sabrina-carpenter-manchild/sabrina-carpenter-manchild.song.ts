import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterManchild = {
  id: "01a0b723-d090-78c1-ac22-ecb1cd864e43",
  type: "page-type/song",
  slug: "sabrina-carpenter-manchild",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fe8d0870-1534-4859-8398-b99103794ea1",
      externalLink: "https://musicbrainz.org/work/fe8d0870-1534-4859-8398-b99103794ea1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Manchild",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
