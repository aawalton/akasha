import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAscensusChristiAPianoRhapsody = {
  id: "01a0676a-d717-7037-afe8-b19dad66132a",
  type: "page-type/release",
  slug: "paul-cardall-ascensus-christi-a-piano-rhapsody",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2025-04-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11WI4gYV1kTzrr6SGil1gj",
      externalLink: "https://open.spotify.com/album/11WI4gYV1kTzrr6SGil1gj",
    },
  ],
  title: "Ascensus Christi: A Piano Rhapsody",
} as const satisfies Release
