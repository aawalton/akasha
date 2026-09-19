import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLoverRemix = {
  id: "01a0ba97-539d-7dc0-a772-8df3caf094cb",
  type: "page-type/song",
  slug: "taylor-swift-lover-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "03955189-25c7-4763-b2e6-fa0a4abf1e70",
      externalLink: "https://musicbrainz.org/work/03955189-25c7-4763-b2e6-fa0a4abf1e70",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lover (remix)",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  written: "collab",
} as const satisfies Song
