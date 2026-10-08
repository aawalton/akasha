import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhatGoesAroundComesAround = {
  id: "019ea416-4adc-72c1-9c9d-8401748dac68",
  type: "page-type/song",
  slug: "taylor-swift-what-goes-around-comes-around",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d1784272-a829-4ff6-90ae-5ad0456050f7",
      externalLink: "https://musicbrainz.org/work/d1784272-a829-4ff6-90ae-5ad0456050f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Goes Around... ...Comes Around",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-06-07T21:56:24.924Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
