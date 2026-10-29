import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS01e10 = {
  id: "01a18881-519f-7faa-8065-c52ee1dcd17d",
  type: "page-type/episode",
  slug: "white-collar-s01e10",
  description:
    "When June's granddaughter suffers renal trauma, Neal stumbles upon a cruel scheme to harvest human organs and brings the case to Peter.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-1"],
  position: 10,
  publishedAt: "2010-02-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596252",
      externalLink: "https://www.themoviedb.org/tv/21510/season/1/episode/10",
    },
  ],
  title: "Vital Signs",
  episodeType: "standard",
  stillPath: "/qCYGFeSGoSwAAhSpmvOakIvO3FY.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
