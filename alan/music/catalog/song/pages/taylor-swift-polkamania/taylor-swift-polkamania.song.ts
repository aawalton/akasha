import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPolkamania = {
  id: "01a0ba97-710a-7f67-84e1-67b35cd4daac",
  type: "page-type/song",
  slug: "taylor-swift-polkamania",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6603b8b5-12b1-4705-a445-9227a27d997f",
      externalLink: "https://musicbrainz.org/work/6603b8b5-12b1-4705-a445-9227a27d997f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Polkamania!",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
