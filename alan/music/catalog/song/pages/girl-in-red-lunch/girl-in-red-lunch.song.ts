import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedLunch = {
  id: "01a0b724-d359-7c21-8b94-cda1e7909db9",
  type: "page-type/song",
  slug: "girl-in-red-lunch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7e79557a-2452-44d9-8e71-585228633fb8",
      externalLink: "https://musicbrainz.org/work/7e79557a-2452-44d9-8e71-585228633fb8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "LUNCH",
  artist: "artist/girl-in-red",
  songType: "derivative",
  performed: true,
} as const satisfies Song
