import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e02 = {
  id: "01a1887f-e185-7b7b-8440-9f9932521576",
  type: "page-type/episode",
  slug: "star-trek-2-s01e02",
  description:
    "Raised from boyhood by non-corporeal beings, 17 year old Charles Evans is picked up and transferred to the Enterprise. On board the ship, the teenager proves dangerously unable to wield his enormous psionic powers with maturity.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-1"],
  position: 2,
  publishedAt: "1966-09-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13957",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/2",
    },
  ],
  title: "Charlie X",
  episodeType: "standard",
  stillPath: "/4DMZ0pglu2EopXtU2gcTYBO3KRG.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
