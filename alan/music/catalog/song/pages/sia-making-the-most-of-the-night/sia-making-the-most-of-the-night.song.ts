import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMakingTheMostOfTheNight = {
  id: "019ea4c8-fb14-777b-9e8c-2e5140fb29b1",
  type: "page-type/song",
  slug: "sia-making-the-most-of-the-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8cb4d0bf-a249-4f91-8679-14cf16fe9b56",
      externalLink: "https://musicbrainz.org/work/8cb4d0bf-a249-4f91-8679-14cf16fe9b56",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Making the Most of the Night",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
