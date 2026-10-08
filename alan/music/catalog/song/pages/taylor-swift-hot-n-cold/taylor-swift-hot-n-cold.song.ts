import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHotNCold = {
  id: "019ea416-1d13-7505-953f-9cd0ae85aaa4",
  type: "page-type/song",
  slug: "taylor-swift-hot-n-cold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ab64b07-4760-3b29-83e1-9f63cd39963f",
      externalLink: "https://musicbrainz.org/work/3ab64b07-4760-3b29-83e1-9f63cd39963f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hot n Cold",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-06-07T21:56:13.203Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
