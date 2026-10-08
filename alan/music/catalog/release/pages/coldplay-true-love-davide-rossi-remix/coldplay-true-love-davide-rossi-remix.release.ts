import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTrueLoveDavideRossiRemix = {
  id: "01a0676a-d72f-7020-94ab-c63afbe89981",
  type: "page-type/release",
  slug: "coldplay-true-love-davide-rossi-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5TJzsFUF2RUzrje51UmkhG",
      externalLink: "https://open.spotify.com/album/5TJzsFUF2RUzrje51UmkhG",
    },
  ],
  title: "True Love (Davide Rossi Remix)",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
