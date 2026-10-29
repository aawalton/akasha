import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e17 = {
  id: "01a18852-d433-7c3d-a769-040297abe7d0",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e17",
  description:
    "Archer goes to extreme lengths to save an abandoned nest of Xindi-Insectoid eggs ready to hatch.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 17,
  publishedAt: "2004-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15594",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/17",
    },
  ],
  title: "Hatchery",
  episodeType: "standard",
  stillPath: "/iaE8dgpJrSbBKWcJW3iBehcWKzy.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
