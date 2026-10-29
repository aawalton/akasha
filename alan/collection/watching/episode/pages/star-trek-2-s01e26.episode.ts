import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e26 = {
  id: "01a1887f-e187-7449-8b76-0adc9a698a43",
  type: "page-type/episode",
  slug: "star-trek-2-s01e26",
  description:
    "The Federation and the Klingon Empire teeter on the brink of war as Kirk investigates Organia, a humble planet, inhabited by pacifists, that is unwittingly caught in the middle.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 26,
  publishedAt: "1967-03-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13976",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/26",
    },
  ],
  title: "Errand of Mercy",
  episodeType: "standard",
  stillPath: "/xzFxTzML6sGGcUEtNGWbu8uLJ8Y.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
