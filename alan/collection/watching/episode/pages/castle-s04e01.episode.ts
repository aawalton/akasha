import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS04e01 = {
  id: "01a1887e-1e3f-7781-b385-ecc1312391ca",
  type: "page-type/episode",
  slug: "castle-s04e01",
  description:
    "Detective Beckett  fights for her life as Castle, plagued by guilt over his role in the events, struggles to uncover who's behind her brutal shooting. Meanwhile, back at the precinct, Ryan and Esposito have to adjust, as Victoria \"Iron\" Gates becomes the precinct's new uncompromising Captain.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-4"],
  position: 1,
  publishedAt: "2011-09-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64841",
      externalLink: "https://www.themoviedb.org/tv/1419/season/4/episode/1",
    },
  ],
  title: "Rise",
  episodeType: "standard",
  stillPath: "/cLNLyoh1Vwvxh315kC8W1SIRBeX.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
