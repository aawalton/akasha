import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAllISeeIsSnow = {
  id: "01a0676a-d716-701d-8413-6cf77f32ee94",
  type: "page-type/release",
  slug: "paul-cardall-all-i-see-is-snow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2020-12-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Yd5YDAQLdqQV9R73dRPSX",
      externalLink: "https://open.spotify.com/album/5Yd5YDAQLdqQV9R73dRPSX",
    },
  ],
  title: "All I See Is Snow",
} as const satisfies Release
