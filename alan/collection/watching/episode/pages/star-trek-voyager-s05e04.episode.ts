import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e04 = {
  id: "01a18853-ac8f-72e9-8558-4fc558e9c51c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e04",
  description:
    "Stardate: Unknown. The crew discovers an outpost manned by a group of Species 8472, who have taken human form as a training measure for an invasion of the Alpha Quadrant.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 4,
  publishedAt: "1998-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113207",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/4",
    },
  ],
  title: "In the Flesh",
  episodeType: "standard",
  stillPath: "/s5nx4JQ1eRcc9c2TpXy1pNsozRI.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
