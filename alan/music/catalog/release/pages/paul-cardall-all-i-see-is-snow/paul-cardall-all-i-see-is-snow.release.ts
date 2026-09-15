import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAllISeeIsSnow = {
  id: "01a0676a-d716-701d-8413-6cf77f32ee94",
  type: "page-type/release",
  slug: "paul-cardall-all-i-see-is-snow",
  title: "All I See Is Snow",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 4.571433,
  ownProgress: 4.571433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Yd5YDAQLdqQV9R73dRPSX",
      externalLink: "https://open.spotify.com/album/5Yd5YDAQLdqQV9R73dRPSX",
    },
  ],
} as const satisfies Release
