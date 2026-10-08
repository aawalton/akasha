import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHeySoulSister = {
  id: "019ea416-2195-724d-9e89-6e017241a75b",
  type: "page-type/song",
  slug: "taylor-swift-hey-soul-sister",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76edfa0a-4b9b-3863-a95b-d63dccf1279f",
      externalLink: "https://musicbrainz.org/work/76edfa0a-4b9b-3863-a95b-d63dccf1279f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hey, Soul Sister",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-06-07T21:56:14.357Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
