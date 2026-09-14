import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const jadaFacerReckless = {
  id: "01a0676a-d727-705a-934f-c5d4e400962a",
  type: "release",
  slug: "jada-facer-reckless",
  title: "Reckless",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.387333,
  ownProgress: 3.387333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-06-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EyRu9wbc0e85qu4yCXadO",
      externalLink: "https://open.spotify.com/album/7EyRu9wbc0e85qu4yCXadO",
    },
  ],
} as const satisfies Release
