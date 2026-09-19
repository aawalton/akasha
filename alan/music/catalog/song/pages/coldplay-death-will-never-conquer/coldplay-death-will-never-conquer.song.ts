import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDeathWillNeverConquer = {
  id: "01a0ba5d-3e84-7a63-9494-d256f04585eb",
  type: "page-type/song",
  slug: "coldplay-death-will-never-conquer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "727a49c9-6ab1-32d6-81d3-6bac86a57daf",
      externalLink: "https://musicbrainz.org/work/727a49c9-6ab1-32d6-81d3-6bac86a57daf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death Will Never Conquer",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
