import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS07e01 = {
  id: "01a18848-c2c2-7f99-82cd-34ddfc0ab528",
  type: "page-type/episode",
  slug: "friends-s07e01",
  description:
    "The gang celebrate Monica and Chandler's engagement. Phoebe wants to be the musician at the wedding and comes up with a new song, while Joey tries to dress and act like a 19-year-old for an audition. Ross and Rachel briefly reunite and after Monica catches them kissing, she's convinced that Rachel is trying to steal her thunder.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-7"],
  position: 1,
  publishedAt: "2000-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87008",
      externalLink: "https://www.themoviedb.org/tv/1668/season/7/episode/1",
    },
  ],
  title: "The One with Monica's Thunder",
  episodeType: "standard",
  stillPath: "/imDBzYIzNH5iSOarKkq84I5L167.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
