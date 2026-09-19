import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOdeToDeodorant = {
  id: "01a0ba60-fd8d-79ba-a4c1-44c44a6ef992",
  type: "page-type/song",
  slug: "coldplay-ode-to-deodorant",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ec306b67-dc9e-4a90-a4f4-caeb992dfd6a",
      externalLink: "https://musicbrainz.org/work/ec306b67-dc9e-4a90-a4f4-caeb992dfd6a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ode to Deodorant",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
