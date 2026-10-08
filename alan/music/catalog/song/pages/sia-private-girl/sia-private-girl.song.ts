import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPrivateGirl = {
  id: "019ea4cc-ab81-7ee9-93a8-c2b0511408f2",
  type: "page-type/song",
  slug: "sia-private-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71dd087b-0d04-4288-aed1-d49b823ad4d1",
      externalLink: "https://musicbrainz.org/work/71dd087b-0d04-4288-aed1-d49b823ad4d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Private Girl",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:15:37.217Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
