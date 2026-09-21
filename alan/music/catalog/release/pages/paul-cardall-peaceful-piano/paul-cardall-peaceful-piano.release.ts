import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallPeacefulPiano = {
  id: "01a0676a-d726-7068-834f-d3efaec69a3e",
  type: "page-type/release",
  slug: "paul-cardall-peaceful-piano",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2019-08-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZU76GoozN90jflYqZM5qr",
      externalLink: "https://open.spotify.com/album/1ZU76GoozN90jflYqZM5qr",
    },
  ],
  title: "Peaceful Piano",
} as const satisfies Release
