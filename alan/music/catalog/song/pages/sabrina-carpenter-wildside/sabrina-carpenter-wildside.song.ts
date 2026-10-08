import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWildside = {
  id: "01a0b723-d0f3-7ce5-aafd-7dc669906602",
  type: "page-type/song",
  slug: "sabrina-carpenter-wildside",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0064aade-9c70-45b9-a828-1a4fa06113e1",
      externalLink: "https://musicbrainz.org/work/0064aade-9c70-45b9-a828-1a4fa06113e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wildside",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:32.915Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
