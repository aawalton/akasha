import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsMeanIt = {
  id: "01a0676a-d724-7045-b94c-e09ff65b77ad",
  type: "page-type/release",
  slug: "gracie-abrams-mean-it",
  title: "Mean It",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2019-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vBpaPYo5I3s90tEmgeacl",
      externalLink: "https://open.spotify.com/album/0vBpaPYo5I3s90tEmgeacl",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
