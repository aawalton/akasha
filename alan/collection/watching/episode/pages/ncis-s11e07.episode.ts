import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e07 = {
  id: "01a1884b-ef71-72e6-84d6-b48034115698",
  type: "page-type/episode",
  slug: "ncis-s11e07",
  description:
    "After Gibbs leaves mid-case to help his father reconnect with a former war pilot, Tony and McGee argue over who should run lead on the team’s investigation into the murder of a Marine Sergeant.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 7,
  publishedAt: "2013-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970553",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/7",
    },
  ],
  title: "Better Angels",
  episodeType: "standard",
  stillPath: "/l1juXf3G4McWFu6IcZO08w8evoQ.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
