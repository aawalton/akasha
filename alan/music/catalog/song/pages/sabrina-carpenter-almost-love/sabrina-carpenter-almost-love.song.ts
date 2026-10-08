import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterAlmostLove = {
  id: "01a0b723-c84f-7bb8-b605-f12fb12986f1",
  type: "page-type/song",
  slug: "sabrina-carpenter-almost-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "807d3d90-56fb-4ff4-a8fa-f87db63826df",
      externalLink: "https://musicbrainz.org/work/807d3d90-56fb-4ff4-a8fa-f87db63826df",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Almost Love",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:30.703Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
