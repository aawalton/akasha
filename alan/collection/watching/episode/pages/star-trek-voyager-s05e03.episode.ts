import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e03 = {
  id: "01a18853-ac8f-7995-99e7-d723438de350",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e03",
  description:
    "Stardate: Unknown. In order to retrieve a probe stuck in a hazardous atmosphere, Tom Paris designs a new type of shuttlecraft named the 'Delta Flyer'. Torres begins to exhibit reckless behavior by engaging in dangerous holodeck programs.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 3,
  publishedAt: "1998-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113206",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/3",
    },
  ],
  title: "Extreme Risk",
  episodeType: "standard",
  stillPath: "/zgHMA4ueU0Via5EL380Cw6eneHE.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
