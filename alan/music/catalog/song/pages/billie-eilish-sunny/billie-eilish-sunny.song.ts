import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSunny = {
  id: "019ea4a9-7a33-7136-863f-930efb96e172",
  type: "page-type/song",
  slug: "billie-eilish-sunny",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "508118f4-56ef-318f-aeae-04ad21759e68",
      externalLink: "https://musicbrainz.org/work/508118f4-56ef-318f-aeae-04ad21759e68",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunny",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
