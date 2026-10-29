import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e10 = {
  id: "01a18857-c369-7d65-86da-56625fd2d60d",
  type: "page-type/episode",
  slug: "the-office-s04e10",
  description:
    "Pam is becoming more and more annoyed with Michael and his indecisiveness about ordering a desk chair. In Michael's defense, he's become distracted by his crush on the woman who is modeling the chair in the catalogue. He reminds Pam that since the infamous dinner party, he is now a single man.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 10,
  publishedAt: "2008-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170242",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/10",
    },
  ],
  title: "Chair Model",
  episodeType: "standard",
  stillPath: "/mBZiRz5yRYKktorBLjDJldWNP5t.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
