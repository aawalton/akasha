import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e22 = {
  id: "01a18853-ac91-7a3e-b07c-8d34b43104a9",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e22",
  description:
    "Stardate: Unknown. An alien poet discovers an unconscious B'Elanna Torres after her crash landing in the Delta Flyer. However, this poet intends on using her in a play based on her life on Voyager to win favour with his Warlord.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 22,
  publishedAt: "2000-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113356",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/22",
    },
  ],
  title: "Muse",
  episodeType: "standard",
  stillPath: "/g9lDv40NiGM2evDRgsGPi8H412T.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
