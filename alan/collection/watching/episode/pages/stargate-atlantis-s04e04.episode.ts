import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e04 = {
  id: "01a18854-82d2-74de-834e-4e39b3b9362e",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e04",
  description:
    "During an off-world mission Colonel Sheppard unknowingly becomes host to an alien entity, which infects others in Atlantis and afflicts them with terrifying nightmares.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 4,
  publishedAt: "2007-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168525",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/4",
    },
  ],
  title: "Doppelganger",
  episodeType: "standard",
  stillPath: "/i6IpzAsfR8Uet4bhAJjjSviLp5C.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
