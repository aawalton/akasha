import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGreedyForTreasure = {
  id: "019ea4e2-ed69-707b-a53c-d3d974033ab9",
  type: "page-type/song",
  slug: "ariana-grande-greedy-for-treasure",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd416788-f533-457d-b3cd-3c281cb84e0a",
      externalLink: "https://musicbrainz.org/work/bd416788-f533-457d-b3cd-3c281cb84e0a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Greedy for Treasure",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
