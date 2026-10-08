import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxBornToDie = {
  id: "019ea4f5-9576-7ef8-b454-c164b1d7188d",
  type: "page-type/song",
  slug: "lilith-max-born-to-die",
  title: "Born to Die",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "784d3a93-fae2-4e44-b744-9942d8dafc16",
      externalLink: "https://musicbrainz.org/recording/784d3a93-fae2-4e44-b744-9942d8dafc16",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  createdAt: "2026-06-08T02:00:18.550Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
