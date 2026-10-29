import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e11 = {
  id: "01a18843-5081-754e-a064-79cd463d724c",
  type: "page-type/episode",
  slug: "babylon-5-s03e11",
  description:
    'Delenn prepares for a ceremony of rebirth, the station\'s computer goes through an interesting change, Londo "encourages" Refa to stop associating with the Shadows, and the remains of the Nightwatch on Babylon 5 plan to strike at Sheridan through Delenn.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 11,
  publishedAt: "1996-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235994",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/11",
    },
  ],
  title: "Ceremonies of Light and Dark",
  episodeType: "standard",
  stillPath: "/6agjafYGAGxXGP10qWSDMRON4dJ.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
