import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHomewardBound = {
  id: "01a0b723-cec1-7d89-81ff-a85f0750850d",
  type: "page-type/song",
  slug: "sabrina-carpenter-homeward-bound",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e4f1b5c9-2310-3a91-9255-d122db77585a",
      externalLink: "https://musicbrainz.org/work/e4f1b5c9-2310-3a91-9255-d122db77585a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Homeward Bound",
  artist: "artist/sabrina-carpenter",
  performed: true,
  createdAt: "2026-09-19T00:49:32.353Z",
  updatedAt: "2026-09-19T16:49:35.000Z",
} as const satisfies Song
