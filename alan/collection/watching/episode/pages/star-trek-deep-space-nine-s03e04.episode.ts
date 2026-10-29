import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS03e04 = {
  id: "01a18852-7712-722b-9878-fb91bb1f8780",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s03e04",
  description:
    "Stardate: Unknown. The Trill homeworld is the setting, as Sisko and Bashir take Jadzia home for treatment when she begins experiencing hallucinations after playing a tune she can't recall.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-3"],
  position: 4,
  publishedAt: "1994-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005754",
      externalLink: "https://www.themoviedb.org/tv/580/season/3/episode/4",
    },
  ],
  title: "Equilibrium",
  episodeType: "standard",
  stillPath: "/zm21Cs56vns15qjfKEy1IGb6Bic.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
