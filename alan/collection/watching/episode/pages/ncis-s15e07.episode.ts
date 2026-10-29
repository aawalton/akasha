import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e07 = {
  id: "01a1884b-ef76-71a0-93cd-f4a858f06992",
  type: "page-type/episode",
  slug: "ncis-s15e07",
  description:
    "A convicted felon claims NCIS framed him for murder a decade ago, so Gibbs investigates and asks Ducky to conduct a new autopsy. Senior FBI agent Fornell joins the probe, since he was the lead investigator in the original joint FBI and NCIS case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 7,
  publishedAt: "2017-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1390875",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/7",
    },
  ],
  title: "Burden of Proof",
  episodeType: "standard",
  stillPath: "/gk02unpodzNaUjWWnk5M7pH8ChB.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
