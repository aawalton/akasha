import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e07 = {
  id: "01a18852-d42f-7983-b45d-ca4db5bb328d",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e07",
  description:
    "Enterprise visits an ancient Vulcan spiritual sanctuary, despite T'Pol's concerns that her human colleagues will be an awkward and disruptive presence there. Upon landing, they discover that the monastery has been forcibly taken over by the Andorians, a paranoid and highly excitable race of aliens with a long history of conflict with the Vulcans.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 7,
  publishedAt: "2001-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15543",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/7",
    },
  ],
  title: "The Andorian Incident",
  episodeType: "standard",
  stillPath: "/bSt5rbYVIy5VpdZXiXNTiKmcmU.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
