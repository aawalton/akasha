import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e11 = {
  id: "01a18853-1b88-791d-845e-6950467de82a",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e11",
  description:
    "At the edge of Federation space, the crew applies for asylum at a comm relay outpost, only for their starship to reveal its shocking true purpose.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 11,
  publishedAt: "2022-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3982183",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/11",
    },
  ],
  title: "Asylum",
  episodeType: "standard",
  stillPath: "/fmDg2fviQoRC6g2jEm1pjDmZFVe.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
