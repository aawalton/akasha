import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraFriends = {
  id: "019ea4a3-ea83-7bde-beae-2b285a54d2fd",
  type: "page-type/song",
  slug: "aurora-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2c452d29-c0ab-4395-b5c9-1fd983aadbf9",
      externalLink: "https://musicbrainz.org/work/2c452d29-c0ab-4395-b5c9-1fd983aadbf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Friends",
  artist: "artist/aurora",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T00:31:06.371Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
