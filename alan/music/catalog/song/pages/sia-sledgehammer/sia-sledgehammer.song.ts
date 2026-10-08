import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSledgehammer = {
  id: "019ea4cd-3c9e-7f34-bcf3-35d655b857b5",
  type: "page-type/song",
  slug: "sia-sledgehammer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "95da91c5-332f-4e2a-881f-51980ba7354d",
      externalLink: "https://musicbrainz.org/work/95da91c5-332f-4e2a-881f-51980ba7354d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sledgehammer",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:16:14.366Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
