import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBeautifulReality = {
  id: "019ea4c5-a20e-7829-878a-dc38a75dc70d",
  type: "page-type/song",
  slug: "sia-beautiful-reality",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd97d3bc-a360-49cb-a665-14ea20e5cfbe",
      externalLink: "https://musicbrainz.org/work/bd97d3bc-a360-49cb-a665-14ea20e5cfbe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Reality",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
