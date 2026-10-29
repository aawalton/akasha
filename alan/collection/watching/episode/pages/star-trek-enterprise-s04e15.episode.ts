import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e15 = {
  id: "01a18852-d434-7c0a-b04c-e56d57439115",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e15",
  description:
    "While Enterprise visits Earth for the launch of Columbia, Phlox is kidnapped and forced to help the Klingons deal with a grave threat toward their species.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 15,
  publishedAt: "2005-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15627",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/15",
    },
  ],
  title: "Affliction (1)",
  episodeType: "standard",
  stillPath: "/j13HyqmBHFdbjHHtNCQ7VKQ8bNK.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
