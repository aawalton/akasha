import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallFaithful = {
  id: "01a0676a-d71d-705d-90ed-d210d8380760",
  type: "page-type/release",
  slug: "paul-cardall-faithful",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2004-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4reM22AiywSJDI40oyEcEf",
      externalLink: "https://open.spotify.com/album/4reM22AiywSJDI40oyEcEf",
    },
  ],
  title: "Faithful",
} as const satisfies Release
