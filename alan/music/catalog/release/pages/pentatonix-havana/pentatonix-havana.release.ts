import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHavana = {
  id: "01a0676a-d71f-705c-9e00-df057fb7f10c",
  type: "page-type/release",
  slug: "pentatonix-havana",
  title: "Havana",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
