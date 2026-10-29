import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS01e02 = {
  id: "01a1887e-1e3c-7e7d-9c5f-c214e0448ef7",
  type: "page-type/episode",
  slug: "castle-s01e02",
  description:
    'When a body of a young woman is found inside the dryer at a laundry room, Castle and Beckett uncover that the young woman worked as a nanny in the upscale building. Meanwhile, as Castle works on his "Nikki Heat" novel series he watches Beckett\'s actions as she works the murder case.',
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/castle-season-1"],
  position: 2,
  publishedAt: "2009-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64811",
      externalLink: "https://www.themoviedb.org/tv/1419/season/1/episode/2",
    },
  ],
  title: "Nanny McDead",
  episodeType: "standard",
  stillPath: "/uX3eVJeXJYfxvv0C5uKF69Ud3ph.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
