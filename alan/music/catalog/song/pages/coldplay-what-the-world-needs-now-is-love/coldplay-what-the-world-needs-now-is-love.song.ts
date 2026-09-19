import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhatTheWorldNeedsNowIsLove = {
  id: "01a0ba5d-4c3d-7348-8872-a315cbf9c5fb",
  type: "page-type/song",
  slug: "coldplay-what-the-world-needs-now-is-love",
  partOfCollections: ["artist/james-taylor"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d3307b4-3150-3969-bb87-3fe68413229f",
      externalLink: "https://musicbrainz.org/work/0d3307b4-3150-3969-bb87-3fe68413229f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What the World Needs Now Is Love",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
