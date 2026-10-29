import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e03 = {
  id: "01a18852-d430-7ab4-ab38-fc1c6b1ac966",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e03",
  description:
    "When attempting to explore a new planet, Enterprise triggers a cloaked mine. While the crew deal with the resulting damage, it's discovered another mine is stuck to the hull. During Reed's attempt to disarm it, a spike is driven into his leg, trapping him out there. While Archer goes out on the hull to help him, the rest of the crew learn they are in a minefield belonging to the Romulan Star Empire, who demand Enterprise leave or face destruction.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 3,
  publishedAt: "2002-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15579",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/3",
    },
  ],
  title: "Minefield",
  episodeType: "standard",
  stillPath: "/zzicvT4XWOxj7Rs1WU4vQwR6YY8.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
