import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineHypothetically = {
  id: "01a0676a-d720-7085-b2e9-b635b78fefcd",
  type: "page-type/release",
  slug: "jenna-raine-hypothetically",
  title: "Hypothetically",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 2.69985,
  ownProgress: 2.69985,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-06-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3840k7aSlsMmh6uK1srrsO",
      externalLink: "https://open.spotify.com/album/3840k7aSlsMmh6uK1srrsO",
    },
  ],
} as const satisfies Release
