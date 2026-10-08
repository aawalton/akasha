import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTaylorForPresident = {
  id: "019ea416-4083-78e5-a3b5-9efa30a74729",
  type: "page-type/song",
  slug: "taylor-swift-taylor-for-president",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee5682d1-c897-42a0-b811-acd6a55ce416",
      externalLink: "https://musicbrainz.org/work/ee5682d1-c897-42a0-b811-acd6a55ce416",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Taylor For President",
  artist: "artist/taylor-swift",
  performed: false,
  createdAt: "2026-06-07T21:56:22.275Z",
  updatedAt: "2026-09-19T16:55:02.000Z",
} as const satisfies Song
