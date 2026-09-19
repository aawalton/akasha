import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStories = {
  id: "019ea4cc-4fbd-7a9d-bec6-2efe65428f60",
  type: "page-type/song",
  slug: "sia-stories",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4cc29b76-5dbd-4204-83cb-6664f6a3ad62",
      externalLink: "https://musicbrainz.org/work/4cc29b76-5dbd-4204-83cb-6664f6a3ad62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stories",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
