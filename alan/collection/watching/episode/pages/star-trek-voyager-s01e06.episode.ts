import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e06 = {
  id: "01a18853-ac89-7676-b43f-710d09e25f89",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e06",
  description:
    "Stardate: 48579.4. The discovery of a wormhole leading to the Alpha Quadrant elates the crew, however, their only contact within range is a skeptical and paranoid Romulan.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 6,
  publishedAt: "1995-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112912",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/6",
    },
  ],
  title: "Eye of the Needle",
  episodeType: "standard",
  stillPath: "/epaIB06XusPUeosfH2NwfHN38vp.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
