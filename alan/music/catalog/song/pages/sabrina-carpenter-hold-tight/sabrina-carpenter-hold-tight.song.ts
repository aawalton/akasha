import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHoldTight = {
  id: "01a0b723-c151-7000-a099-94aeb0c0eca0",
  type: "page-type/song",
  slug: "sabrina-carpenter-hold-tight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2019ce12-fc6a-4f0e-9a66-c1092303f914",
      externalLink: "https://musicbrainz.org/work/2019ce12-fc6a-4f0e-9a66-c1092303f914",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hold Tight",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:28.913Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
