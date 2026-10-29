import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e04 = {
  id: "01a18848-c2bf-7814-8911-144ad819f83b",
  type: "page-type/episode",
  slug: "friends-s05e04",
  description:
    "Joey lands a job with a PBS telethon, which ignites an old hatred Phoebe has towards the network.  Meanwhile, Monica tries to convince Rachel that she's dating someone from work to hide her relationship with Chandler. And Ross finally gets in touch with Emily and they try to work it out.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 4,
  publishedAt: "1998-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86715",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/4",
    },
  ],
  title: "The One Where Phoebe Hates PBS",
  episodeType: "standard",
  stillPath: "/8D2MBiGgf1mBPKZ31N3L9sVGNve.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
