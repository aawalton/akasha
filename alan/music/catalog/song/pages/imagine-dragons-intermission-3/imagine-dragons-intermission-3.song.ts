import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIntermission3 = {
  id: "019ea497-8087-7c9c-be3a-69aeb7e5eed1",
  type: "page-type/song",
  slug: "imagine-dragons-intermission-3",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ad80052-10d2-4efe-b7c7-b38aa1548f91",
      externalLink: "https://musicbrainz.org/work/3ad80052-10d2-4efe-b7c7-b38aa1548f91",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Intermission #3",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
