import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineCeremonials = {
  id: "01a0676a-d71a-700c-9204-5f13f89acd5f",
  type: "page-type/release",
  slug: "florence-the-machine-ceremonials",
  title: "Ceremonials",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 72.288117,
  ownProgress: 72.288117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3tFAP5BTa1lwUp7lLJ9FlG",
      externalLink: "https://open.spotify.com/album/3tFAP5BTa1lwUp7lLJ9FlG",
    },
  ],
} as const satisfies Release
