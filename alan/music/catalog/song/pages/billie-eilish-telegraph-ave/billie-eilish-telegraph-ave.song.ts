import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTelegraphAve = {
  id: "019ea4ab-fa0d-7a3d-b3d0-0f76aa105af4",
  type: "page-type/song",
  slug: "billie-eilish-telegraph-ave",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e34966a4-f200-4908-8fe4-d02b46c6cfdf",
      externalLink: "https://musicbrainz.org/work/e34966a4-f200-4908-8fe4-d02b46c6cfdf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Telegraph Ave.",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
