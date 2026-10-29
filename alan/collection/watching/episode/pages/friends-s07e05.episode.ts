import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS07e05 = {
  id: "01a18848-c2c2-7d61-807c-c4a714e9c87f",
  type: "page-type/episode",
  slug: "friends-s07e05",
  description:
    "While taking an engagement picture for himself and Monica, Chandler cannot make anything but a weird face. Meanwhile, Rachel enlists Joey to take Tag out for a night on the town. Also, Phoebe and Ross date a couple in the middle of a divorce.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-7"],
  position: 5,
  publishedAt: "2000-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87017",
      externalLink: "https://www.themoviedb.org/tv/1668/season/7/episode/5",
    },
  ],
  title: "The One with the Engagement Picture",
  episodeType: "standard",
  stillPath: "/9SKIbk7GXFVk7o95eLrNXsTboNl.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
