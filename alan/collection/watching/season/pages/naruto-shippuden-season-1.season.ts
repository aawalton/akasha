import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoShippudenSeason1 = {
  id: "01a183d2-3bf7-7c9d-9098-bbdf4288e725",
  type: "page-type/season",
  slug: "naruto-shippuden-season-1",
  description:
    "Naruto Uzumaki is back! After two and a half years of training on the road with Jiraiya of the Sannin, Naruto is back in the Village Hidden in the Leaves and he's ready to show off his new skills. He and Sakura team up to take on their old master Kakashi, who's pretty impressed with their progress. They'll have plenty of opportunity to put it into action when news arrives from the Sand Village that Gaara, Naruto's former rival and now Kazekage of the Sand, has been kidnapped! And the culprits are the very same group who are after Naruto - the Akatsuki!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto-shippuden"],
  position: 1,
  publishedAt: "2007-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "43373",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1",
    },
  ],
  title: "S1 • Kazekage Rescue",
  posterPath: "/cZVmDRYOPjGRpcmXBwH7RULiS4v.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Season
