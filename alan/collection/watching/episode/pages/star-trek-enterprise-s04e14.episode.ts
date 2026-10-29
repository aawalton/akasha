import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e14 = {
  id: "01a18852-d434-79de-9168-298247e963b4",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e14",
  description:
    "Archer visits Shran's icy homeworld to find an Andorian subspecies called the Aenar, to determine their connection to the marauder destroying ships in the region.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 14,
  publishedAt: "2005-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15633",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/14",
    },
  ],
  title: "The Aenar (3)",
  episodeType: "standard",
  stillPath: "/tjxxsY70ILRI9n8wKglTmHGLdxh.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
