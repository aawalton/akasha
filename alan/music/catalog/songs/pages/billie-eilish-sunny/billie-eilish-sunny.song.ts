import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const billieEilishSunny = {
  id: "019ea4a9-7a33-7136-863f-930efb96e172",
  type: "song",
  slug: "billie-eilish-sunny",
  title: "Sunny",
  artist: "billie-eilish",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "508118f4-56ef-318f-aeae-04ad21759e68",
      externalLink: "https://musicbrainz.org/work/508118f4-56ef-318f-aeae-04ad21759e68",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
