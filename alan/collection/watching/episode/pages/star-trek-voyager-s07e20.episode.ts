import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e20 = {
  id: "01a18853-ac93-7b73-9522-bfc0fe3fab37",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e20",
  description:
    "Stardate: 54732.3 - When the Doctor arranges to have his recently completed holodeck novel published in the Alpha Quadrant, certain aspects of the story hit too close to home among his shipmates.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 20,
  publishedAt: "2001-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466848",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/20",
    },
  ],
  title: "Author, Author",
  episodeType: "standard",
  stillPath: "/1H0SpJmho5w1b0EMlbww914VzSz.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
