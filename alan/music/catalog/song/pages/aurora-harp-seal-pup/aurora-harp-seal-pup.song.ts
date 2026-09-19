import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHarpSealPup = {
  id: "019ea4a5-b53f-752a-a1d8-f5727f2b3fde",
  type: "page-type/song",
  slug: "aurora-harp-seal-pup",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6dab663f-ee91-4f41-b98e-2394046f847a",
      externalLink: "https://musicbrainz.org/work/6dab663f-ee91-4f41-b98e-2394046f847a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Harp Seal Pup",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
