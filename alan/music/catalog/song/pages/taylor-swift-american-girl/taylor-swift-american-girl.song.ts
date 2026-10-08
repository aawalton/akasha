import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAmericanGirl = {
  id: "019ea416-09eb-74a3-81ed-c76be580324b",
  type: "page-type/song",
  slug: "taylor-swift-american-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "667f5519-d5d5-3b0a-8c78-5d8d36b98dfe",
      externalLink: "https://musicbrainz.org/work/667f5519-d5d5-3b0a-8c78-5d8d36b98dfe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "American Girl",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-06-07T21:56:08.299Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
