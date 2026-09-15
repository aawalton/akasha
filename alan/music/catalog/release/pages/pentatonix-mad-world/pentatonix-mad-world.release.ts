import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixMadWorld = {
  id: "01a0676a-d724-7022-85a2-0986a58b52ba",
  type: "page-type/release",
  slug: "pentatonix-mad-world",
  title: "Mad World",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 6.3776,
  ownProgress: 6.3776,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-10-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZulBNAFP9rXcTJmmncBae",
      externalLink: "https://open.spotify.com/album/1ZulBNAFP9rXcTJmmncBae",
    },
  ],
} as const satisfies Release
