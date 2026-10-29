import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e22 = {
  id: "01a18852-d434-7888-a280-e97908df6518",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e22",
  description:
    "Six years in the future, an emotional Captain Archer and the crew return to Earth to face the decommission of Enterprise and signing of the Federation charter.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 22,
  publishedAt: "2005-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15624",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/22",
    },
  ],
  title: "These Are the Voyages...",
  episodeType: "finale",
  stillPath: "/hF5fwKvh9YdAEW1lx1hU3FXFR6e.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
