import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e16 = {
  id: "01a18852-d433-7056-a35b-b4a410069e0f",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e16",
  description:
    "The fate of Enterprise is in Dr. Phlox's hands as the rest of the crew must be induced into a coma in order to survive a trans-dimensional disturbance.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 16,
  publishedAt: "2004-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15595",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/16",
    },
  ],
  title: "Doctor's Orders",
  episodeType: "standard",
  stillPath: "/m70rYWBY7ZhcTjK79qZ9069kGlP.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
