import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHavana = {
  id: "01a0676a-d71f-705c-9e00-df057fb7f10c",
  type: "release",
  slug: "pentatonix-havana",
  title: "Havana",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 2.568383,
  ownProgress: 2.568383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-02-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JBFPW02DEVMX4xlRNJm2Z",
      externalLink: "https://open.spotify.com/album/6JBFPW02DEVMX4xlRNJm2Z",
    },
  ],
} as const satisfies Release
