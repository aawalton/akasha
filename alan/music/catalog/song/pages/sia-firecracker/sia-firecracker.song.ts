import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFirecracker = {
  id: "019ea4c7-08d5-719b-ae20-482a9119f156",
  type: "page-type/song",
  slug: "sia-firecracker",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "260c9160-a627-4b18-bd3b-370faeaae967",
      externalLink: "https://musicbrainz.org/work/260c9160-a627-4b18-bd3b-370faeaae967",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Firecracker",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
