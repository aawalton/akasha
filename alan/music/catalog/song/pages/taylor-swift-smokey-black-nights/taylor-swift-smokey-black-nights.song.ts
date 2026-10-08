import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSmokeyBlackNights = {
  id: "019ea416-4019-74f2-8c58-c7dc1548cc60",
  type: "page-type/song",
  slug: "taylor-swift-smokey-black-nights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ecd46d84-5530-4d6f-9631-83227f2751b3",
      externalLink: "https://musicbrainz.org/work/ecd46d84-5530-4d6f-9631-83227f2751b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Smokey Black Nights",
  artist: "artist/taylor-swift",
  performed: true,
  written: "solo",
  createdAt: "2026-06-07T21:56:22.169Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
