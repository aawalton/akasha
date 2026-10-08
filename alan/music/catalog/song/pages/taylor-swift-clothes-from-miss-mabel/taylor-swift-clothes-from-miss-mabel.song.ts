import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftClothesFromMissMabel = {
  id: "019ea416-0cf1-7101-9601-658c61beb4d1",
  type: "page-type/song",
  slug: "taylor-swift-clothes-from-miss-mabel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7cb2cf5c-2cac-4d96-8d36-611c72347196",
      externalLink: "https://musicbrainz.org/work/7cb2cf5c-2cac-4d96-8d36-611c72347196",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clothes From Miss Mabel",
  artist: "artist/taylor-swift",
  performed: false,
  written: "solo",
  createdAt: "2026-06-07T21:56:09.073Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
