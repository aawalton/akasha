import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraOriginsOfLife = {
  id: "019ea4a5-fbee-7e2b-a85b-84813597a656",
  type: "page-type/song",
  slug: "aurora-origins-of-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7bfdf73c-5e70-48f7-a81f-e17a67b8b651",
      externalLink: "https://musicbrainz.org/work/7bfdf73c-5e70-48f7-a81f-e17a67b8b651",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Origins of Life",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-06-08T00:33:21.902Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
