import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraOriginsOfLife = {
  id: "019ea4a5-fbee-7e2b-a85b-84813597a656",
  type: "song",
  slug: "aurora-origins-of-life",
  title: "Origins of Life",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7bfdf73c-5e70-48f7-a81f-e17a67b8b651",
      externalLink: "https://musicbrainz.org/work/7bfdf73c-5e70-48f7-a81f-e17a67b8b651",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
