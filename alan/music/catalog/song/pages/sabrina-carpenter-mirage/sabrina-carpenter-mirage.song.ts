import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterMirage = {
  id: "01a0b723-c7be-7d7f-bd89-872529e840d9",
  type: "page-type/song",
  slug: "sabrina-carpenter-mirage",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "786944cb-26e5-4ba1-aef8-75b1c8f16bc3",
      externalLink: "https://musicbrainz.org/work/786944cb-26e5-4ba1-aef8-75b1c8f16bc3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mirage",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
