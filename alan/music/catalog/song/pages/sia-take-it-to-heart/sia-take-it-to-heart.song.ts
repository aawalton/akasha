import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTakeItToHeart = {
  id: "019ea4cb-17cb-79c2-a01a-4660b7e64489",
  type: "page-type/song",
  slug: "sia-take-it-to-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f44aae0-e66b-468f-a1fd-a2916c585d7e",
      externalLink: "https://musicbrainz.org/work/1f44aae0-e66b-468f-a1fd-a2916c585d7e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take It to Heart",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
