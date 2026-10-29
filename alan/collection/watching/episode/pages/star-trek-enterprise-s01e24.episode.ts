import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e24 = {
  id: "01a18852-d430-7d94-8039-26404770b537",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e24",
  description:
    "When Archer and Trip are invited to a desert-like planet by an alien leader, they discover he is a terrorist who has lured them there under false pretences. Meanwhile, T'Pol, while in command, faces a tough decision when she cannot locate Archer and Trip in the desert.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 24,
  publishedAt: "2002-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15559",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/24",
    },
  ],
  title: "Desert Crossing",
  episodeType: "standard",
  stillPath: "/6hByIMBLkW3v7uG3HKcKpsNhC7r.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
