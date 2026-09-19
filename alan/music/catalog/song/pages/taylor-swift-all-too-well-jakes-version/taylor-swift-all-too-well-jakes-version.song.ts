import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllTooWellJakesVersion = {
  id: "01a0ba97-4252-7b19-91f6-b72a266b9a3a",
  type: "page-type/song",
  slug: "taylor-swift-all-too-well-jakes-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "223bae6c-6f53-446a-8914-a31b75b78e3b",
      externalLink: "https://musicbrainz.org/work/223bae6c-6f53-446a-8914-a31b75b78e3b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All Too Well (Jake’s version)",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
