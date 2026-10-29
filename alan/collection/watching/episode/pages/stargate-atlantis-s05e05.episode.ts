import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS05e05 = {
  id: "01a18854-82d3-708a-bd39-9a661b7fbe0a",
  type: "page-type/episode",
  slug: "stargate-atlantis-s05e05",
  description:
    "While on a mission, Lt. Colonel John Sheppard's team inadvertently brings a mysterious entity to Atlantis. They soon learn that the entity is nothing more than Dr. Elizabeth Weir, who was thought to have been killed after her capture by the Asurans.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-5"],
  position: 5,
  publishedAt: "2008-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168551",
      externalLink: "https://www.themoviedb.org/tv/2290/season/5/episode/5",
    },
  ],
  title: "Ghost in the Machine",
  episodeType: "standard",
  stillPath: "/qXs3MHkxhBZ0w7gbZRAMVG67GAa.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
