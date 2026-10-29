import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e09 = {
  id: "01a18852-d433-790c-b906-e191da08d99c",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e09",
  description:
    "Archer, T'Pol and T'Pau attempt to bring the Kir'Shara — an artifact believed to contain Surak's original writings — to the Vulcan capital, as the NX-01 gets involved in a Vulcan-Andorian military clash.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 9,
  publishedAt: "2004-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15618",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/9",
    },
  ],
  title: "Kir'Shara (3)",
  episodeType: "standard",
  stillPath: "/6S9xhP664GriwjzV3gJYws0RgJD.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
